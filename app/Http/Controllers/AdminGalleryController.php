<?php

namespace App\Http\Controllers;

use App\Models\GalleryImage;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminGalleryController extends Controller
{
    public function index()
    {
        $images = GalleryImage::orderBy('display_order')->get();
        return Inertia::render('Admin/Gallery', ['images' => $images]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'image_url' => 'required|url',
            'caption' => 'nullable|string|max:500',
            'display_order' => 'nullable|integer',
            'is_hero' => 'nullable|boolean',
        ]);

        GalleryImage::create($validated);

        return redirect()->back()->with('success', 'Gallery image added.');
    }

    public function destroy(GalleryImage $image)
    {
        $image->delete();
        return redirect()->back()->with('success', 'Gallery image deleted.');
    }
}
