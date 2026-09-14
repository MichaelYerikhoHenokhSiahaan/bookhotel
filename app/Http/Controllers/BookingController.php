<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use App\Models\Booking;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'check_in' => 'nullable|date|after_or_equal:today',
            'check_out' => 'nullable|date|after:check_in',
            'adults' => 'nullable|integer|min:1',
            'children' => 'nullable|integer|min:0',
        ]);

        $checkIn = $request->input('check_in', Carbon::now()->addDays(1)->format('Y-m-d'));
        $checkOut = $request->input('check_out', Carbon::now()->addDays(3)->format('Y-m-d'));
        $adults = (int) $request->input('adults', 2);
        $children = (int) $request->input('children', 0);

        $roomTypes = RoomType::where('is_active', true)
            ->where('capacity_adults', '>=', $adults)
            ->get()
            ->map(function ($room) use ($checkIn, $checkOut) {
                $availableCount = $room->getAvailableCount($checkIn, $checkOut);
                $rateDetails = $room->getCalculatedNightlyRate($checkIn, $checkOut);

                return [
                    'id' => $room->id,
                    'name' => $room->name,
                    'slug' => $room->slug,
                    'description' => $room->description,
                    'base_price' => $room->base_price,
                    'capacity_adults' => $room->capacity_adults,
                    'capacity_children' => $room->capacity_children,
                    'size_sqm' => $room->size_sqm,
                    'bed_type' => $room->bed_type,
                    'amenities' => $room->amenities,
                    'featured_image' => $room->featured_image,
                    'gallery_images' => $room->gallery_images,
                    'available_count' => $availableCount,
                    'rate_details' => $rateDetails,
                ];
            });

        return Inertia::render('Booking/Search', [
            'searchParams' => [
                'check_in' => $checkIn,
                'check_out' => $checkOut,
                'adults' => $adults,
                'children' => $children,
            ],
            'rooms' => $roomTypes,
        ]);
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'room_type_id' => 'required|exists:room_types,id',
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
            'adults' => 'required|integer|min:1',
            'children' => 'nullable|integer|min:0',
        ]);

        $room = RoomType::findOrFail($request->room_type_id);
        $checkIn = $request->check_in;
        $checkOut = $request->check_out;

        $availableCount = $room->getAvailableCount($checkIn, $checkOut);
        if ($availableCount <= 0) {
            return redirect()->back()->withErrors(['room' => 'Sorry, this room type is fully booked for your selected dates.']);
        }

        $rateDetails = $room->getCalculatedNightlyRate($checkIn, $checkOut);

        return Inertia::render('Booking/Checkout', [
            'room' => $room,
            'checkIn' => $checkIn,
            'checkOut' => $checkOut,
            'adults' => (int) $request->adults,
            'children' => (int) ($request->children ?? 0),
            'rateDetails' => $rateDetails,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_type_id' => 'required|exists:room_types,id',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'guest_phone' => 'required|string|max:50',
            'check_in' => 'required|date|after_or_equal:today',
            'check_out' => 'required|date|after:check_in',
            'adults' => 'required|integer|min:1',
            'children' => 'nullable|integer|min:0',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $room = RoomType::findOrFail($validated['room_type_id']);
        
        // Final availability guard
        if ($room->getAvailableCount($validated['check_in'], $validated['check_out']) <= 0) {
            return redirect()->route('booking.search')->withErrors(['error' => 'Selected dates are no longer available. Please select another room or dates.']);
        }

        $rateDetails = $room->getCalculatedNightlyRate($validated['check_in'], $validated['check_out']);

        $booking = Booking::create([
            'confirmation_code' => Booking::generateConfirmationCode(),
            'room_type_id' => $room->id,
            'guest_name' => $validated['guest_name'],
            'guest_email' => $validated['guest_email'],
            'guest_phone' => $validated['guest_phone'],
            'check_in' => $validated['check_in'],
            'check_out' => $validated['check_out'],
            'adults' => $validated['adults'],
            'children' => $validated['children'] ?? 0,
            'nightly_rate' => $rateDetails['nightly_rate'],
            'total_nights' => $rateDetails['total_nights'],
            'subtotal' => $rateDetails['subtotal'],
            'taxes_and_fees' => $rateDetails['taxes_and_fees'],
            'total_amount' => $rateDetails['total_amount'],
            'status' => 'confirmed',
            'special_requests' => $validated['special_requests'] ?? null,
        ]);

        return redirect()->route('booking.confirmation', ['code' => $booking->confirmation_code]);
    }

    public function confirmation($code)
    {
        $booking = Booking::with('roomType')->where('confirmation_code', $code)->firstOrFail();

        return Inertia::render('Booking/Confirmation', [
            'booking' => $booking,
        ]);
    }

    public function lookup(Request $request)
    {
        $code = $request->input('code');
        $booking = null;

        if ($code) {
            $booking = Booking::with('roomType')->where('confirmation_code', trim($code))->first();
        }

        return Inertia::render('Booking/Lookup', [
            'searchCode' => $code,
            'booking' => $booking,
        ]);
    }
}
