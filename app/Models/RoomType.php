<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class RoomType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'base_price',
        'capacity_adults',
        'capacity_children',
        'size_sqm',
        'bed_type',
        'amenities',
        'featured_image',
        'gallery_images',
        'total_inventory',
        'is_active',
    ];

    protected $casts = [
        'base_price' => 'float',
        'capacity_adults' => 'integer',
        'capacity_children' => 'integer',
        'size_sqm' => 'integer',
        'total_inventory' => 'integer',
        'is_active' => 'boolean',
        'amenities' => 'array',
        'gallery_images' => 'array',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function seasonalRates()
    {
        return $this->hasMany(SeasonalRate::class);
    }

    /**
     * Calculate average nightly rate for given dates considering seasonal rate rules.
     */
    public function getCalculatedNightlyRate($checkIn, $checkOut)
    {
        $startDate = Carbon::parse($checkIn);
        $endDate = Carbon::parse($checkOut);
        $totalNights = max(1, $startDate->diffInDays($endDate));
        $totalCost = 0;

        $rules = SeasonalRate::where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('room_type_id')->orWhere('room_type_id', $this->id);
            })
            ->get();

        $current = $startDate->copy();
        while ($current->lt($endDate)) {
            $dateStr = $current->format('Y-m-d');
            $dailyPrice = $this->base_price;

            // Check if date falls into any active seasonal rate rule
            $matchedRule = $rules->first(function ($rule) use ($dateStr) {
                return $dateStr >= $rule->start_date && $dateStr <= $rule->end_date;
            });

            if ($matchedRule) {
                if ($matchedRule->fixed_override_price !== null) {
                    $dailyPrice = (float) $matchedRule->fixed_override_price;
                } else {
                    $dailyPrice = $this->base_price * (float) $matchedRule->rate_multiplier;
                }
            } else {
                // Weekend surcharge (Friday & Saturday +15%)
                if ($current->isFriday() || $current->isSaturday()) {
                    $dailyPrice = $this->base_price * 1.15;
                }
            }

            $totalCost += $dailyPrice;
            $current->addDay();
        }

        return [
            'total_nights' => $totalNights,
            'nightly_rate' => round($totalCost / $totalNights, 2),
            'subtotal' => round($totalCost, 2),
            'taxes_and_fees' => round($totalCost * 0.12, 2), // 12% hotel tax & service fee
            'total_amount' => round($totalCost * 1.12, 2),
        ];
    }

    /**
     * Check how many rooms are available for specified check-in / check-out dates.
     */
    public function getAvailableCount($checkIn, $checkOut)
    {
        $bookedCount = $this->bookings()
            ->where('status', '!=', 'cancelled')
            ->where(function ($q) use ($checkIn, $checkOut) {
                $q->whereBetween('check_in', [$checkIn, $checkOut])
                  ->orWhereBetween('check_out', [$checkIn, $checkOut])
                  ->orWhere(function ($sub) use ($checkIn, $checkOut) {
                      $sub->where('check_in', '<=', $checkIn)
                          ->where('check_out', '>=', $checkOut);
                  });
            })
            ->count();

        return max(0, $this->total_inventory - $bookedCount);
    }
}
