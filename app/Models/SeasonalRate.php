<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeasonalRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_type_id',
        'title',
        'start_date',
        'end_date',
        'rate_multiplier',
        'fixed_override_price',
        'is_active',
    ];

    protected $casts = [
        'rate_multiplier' => 'float',
        'fixed_override_price' => 'float',
        'is_active' => 'boolean',
    ];

    public function roomType()
    {
        return $this->belongsTo(RoomType::class);
    }
}
