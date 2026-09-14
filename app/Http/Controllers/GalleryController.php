<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        $images = GalleryImage::orderBy('display_order')->get();
        $categories = GalleryImage::select('category')->distinct()->pluck('category');

        return Inertia::render('Gallery', [
            'images' => $images,
            'categories' => $categories,
        ]);
    }
}
