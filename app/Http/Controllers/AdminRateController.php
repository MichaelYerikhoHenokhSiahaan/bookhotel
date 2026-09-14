<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use App\Models\SeasonalRate;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminRateController extends Controller
{
    public function index()
    {
        $rooms = RoomType::all();
        $seasonalRates = SeasonalRate::with('roomType')->orderBy('start_date')->get();

        return Inertia::render('Admin/RateManagement', [
            'rooms' => $rooms,
            'seasonalRates' => $seasonalRates,
        ]);
    }

    public function updateBaseRate(Request $request, RoomType $room)
    {
        $request->validate([
            'base_price' => 'required|numeric|min:0',
        ]);

        $room->update(['base_price' => $request->base_price]);

        return redirect()->back()->with('success', "Base rate updated for {$room->name}");
    }

    public function storeSeasonalRate(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'room_type_id' => 'nullable|exists:room_types,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'rate_multiplier' => 'required|numeric|min:0.5|max:3.0',
            'fixed_override_price' => 'nullable|numeric|min:0',
        ]);

        SeasonalRate::create($validated);

        return redirect()->back()->with('success', 'New rate adjustment rule created.');
    }

    public function destroySeasonalRate(SeasonalRate $seasonalRate)
    {
        $seasonalRate->delete();

        return redirect()->back()->with('success', 'Seasonal rate rule removed.');
    }
}
