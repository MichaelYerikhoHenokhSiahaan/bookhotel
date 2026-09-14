<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use App\Models\GalleryImage;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $heroSlides = GalleryImage::where('is_hero', true)
            ->orderBy('display_order')
            ->get();

        if ($heroSlides->isEmpty()) {
            $heroSlides = GalleryImage::orderBy('display_order')->take(5)->get();
        }

        $featuredRooms = RoomType::where('is_active', true)
            ->take(4)
            ->get();

        $galleryPreview = GalleryImage::orderBy('display_order')->take(6)->get();

        return Inertia::render('Home', [
            'heroSlides' => $heroSlides,
            'featuredRooms' => $featuredRooms,
            'galleryPreview' => $galleryPreview,
        ]);
    }
}
