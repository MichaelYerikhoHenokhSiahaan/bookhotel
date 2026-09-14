<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\RoomType;
use App\Models\SeasonalRate;
use App\Models\GalleryImage;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today()->format('Y-m-d');

        $totalBookings = Booking::count();
        $totalRevenue = Booking::where('status', '!=', 'cancelled')->sum('total_amount');
        
        $todayCheckIns = Booking::with('roomType')
            ->where('check_in', $today)
            ->where('status', '!=', 'cancelled')
            ->get();

        $todayCheckOuts = Booking::with('roomType')
            ->where('check_out', $today)
            ->where('status', '!=', 'cancelled')
            ->get();

        $recentBookings = Booking::with('roomType')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        $activeRooms = RoomType::where('is_active', true)->get();
        $totalInventory = $activeRooms->sum('total_inventory');
        
        $activeBookingsToday = Booking::where('status', '!=', 'cancelled')
            ->where('check_in', '<=', $today)
            ->where('check_out', '>=', $today)
            ->count();

        $occupancyRate = $totalInventory > 0 ? round(($activeBookingsToday / $totalInventory) * 100, 1) : 0;

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalBookings' => $totalBookings,
                'totalRevenue' => round($totalRevenue, 2),
                'occupancyRate' => $occupancyRate,
                'activeBookingsCount' => $activeBookingsToday,
                'totalInventory' => $totalInventory,
            ],
            'todayCheckIns' => $todayCheckIns,
            'todayCheckOuts' => $todayCheckOuts,
            'recentBookings' => $recentBookings,
        ]);
    }

    public function bookings(Request $request)
    {
        $query = Booking::with('roomType');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('confirmation_code', 'like', "%{$search}%")
                  ->orWhere('guest_name', 'like', "%{$search}%")
                  ->orWhere('guest_email', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Bookings', [
            'bookings' => $bookings,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function updateBookingStatus(Request $request, Booking $booking)
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,checked_in,completed,cancelled',
        ]);

        $booking->update(['status' => $request->status]);

        return redirect()->back()->with('success', 'Booking status updated successfully.');
    }
}
