<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'confirmation_code',
        'room_type_id',
        'guest_name',
        'guest_email',
        'guest_phone',
        'check_in',
        'check_out',
        'adults',
        'children',
        'nightly_rate',
        'total_nights',
        'subtotal',
        'taxes_and_fees',
        'total_amount',
        'status',
        'special_requests',
    ];

    protected $casts = [
        'adults' => 'integer',
        'children' => 'integer',
        'total_nights' => 'integer',
        'nightly_rate' => 'float',
        'subtotal' => 'float',
        'taxes_and_fees' => 'float',
        'total_amount' => 'float',
    ];

    public function roomType()
    {
        return $this->belongsTo(RoomType::class);
    }

    public static function generateConfirmationCode()
    {
        do {
            $code = 'GV-' . strtoupper(Str::random(6));
        } while (static::where('confirmation_code', $code)->exists());

        return $code;
    }
}
