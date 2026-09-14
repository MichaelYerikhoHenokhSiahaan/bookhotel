<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminRoomController extends Controller
{
    public function index()
    {
        $rooms = RoomType::all();
        return Inertia::render('Admin/Rooms', ['rooms' => $rooms]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'base_price' => 'required|numeric|min:0',
            'capacity_adults' => 'required|integer|min:1',
            'capacity_children' => 'required|integer|min:0',
            'size_sqm' => 'required|integer|min:1',
            'bed_type' => 'required|string|max:255',
            'featured_image' => 'required|url',
            'total_inventory' => 'required|integer|min:1',
        ]);

        $validated['slug'] = Str::slug($validated['name']) . '-' . Str::random(4);
        $validated['amenities'] = ['Wi-Fi', 'Smart TV', 'Air Conditioning', 'Ensuite Bath'];

        RoomType::create($validated);

        return redirect()->back()->with('success', 'Room type created successfully.');
    }

    public function update(Request $request, RoomType $room)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'base_price' => 'required|numeric|min:0',
            'capacity_adults' => 'required|integer|min:1',
            'capacity_children' => 'required|integer|min:0',
            'size_sqm' => 'required|integer|min:1',
            'bed_type' => 'required|string|max:255',
            'featured_image' => 'required|url',
            'total_inventory' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $room->update($validated);

        return redirect()->back()->with('success', 'Room type updated successfully.');
    }

    public function destroy(RoomType $room)
    {
        $room->delete();
        return redirect()->back()->with('success', 'Room type deleted.');
    }
}
