<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'image_url',
        'caption',
        'display_order',
        'is_hero',
    ];

    protected $casts = [
        'display_order' => 'integer',
        'is_hero' => 'boolean',
    ];
}
