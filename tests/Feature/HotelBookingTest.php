<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\RoomType;
use App\Models\Booking;
use App\Models\SeasonalRate;
use Carbon\Carbon;

class HotelBookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_loads_successfully()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_gallery_page_loads_successfully()
    {
        $response = $this->get('/gallery');
        $response->assertStatus(200);
    }

    public function test_booking_search_returns_available_rooms()
    {
        $room = RoomType::create([
            'name' => 'Test Ocean Suite',
            'slug' => 'test-ocean-suite',
            'description' => 'A luxury test suite with ocean view.',
            'base_price' => 300.00,
            'capacity_adults' => 2,
            'capacity_children' => 1,
            'size_sqm' => 45,
            'bed_type' => '1 King Bed',
            'amenities' => ['Wi-Fi', 'Ocean View'],
            'featured_image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
            'total_inventory' => 5,
            'is_active' => true,
        ]);

        $checkIn = Carbon::now()->addDays(1)->format('Y-m-d');
        $checkOut = Carbon::now()->addDays(3)->format('Y-m-d');

        $response = $this->get("/booking/search?check_in={$checkIn}&check_out={$checkOut}&adults=2");

        $response->assertStatus(200);
    }

    public function test_booking_creation_generates_confirmation_code()
    {
        $room = RoomType::create([
            'name' => 'Deluxe Suite',
            'slug' => 'deluxe-suite',
            'description' => 'Test description',
            'base_price' => 200.00,
            'capacity_adults' => 2,
            'capacity_children' => 0,
            'size_sqm' => 35,
            'bed_type' => '1 King Bed',
            'featured_image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
            'total_inventory' => 3,
            'is_active' => true,
        ]);

        $checkIn = Carbon::now()->addDays(2)->format('Y-m-d');
        $checkOut = Carbon::now()->addDays(4)->format('Y-m-d');

        $postData = [
            'room_type_id' => $room->id,
            'guest_name' => 'Eleanor Vance',
            'guest_email' => 'eleanor@example.com',
            'guest_phone' => '+15551234567',
            'check_in' => $checkIn,
            'check_out' => $checkOut,
            'adults' => 2,
            'children' => 0,
            'special_requests' => 'Quiet room please.',
        ];

        $response = $this->post('/booking/store', $postData);

        $booking = Booking::where('guest_email', 'eleanor@example.com')->first();

        $this->assertNotNull($booking);
        $this->assertStringStartsWith('GV-', $booking->confirmation_code);
        $this->assertEquals('confirmed', $booking->status);
        $this->assertEquals(400.00, $booking->subtotal);

        $response->assertRedirect(route('booking.confirmation', ['code' => $booking->confirmation_code]));
    }

    public function test_admin_dashboard_renders()
    {
        $response = $this->get('/admin');
        $response->assertStatus(200);
    }

    public function test_admin_rate_management_updates_base_rate()
    {
        $room = RoomType::create([
            'name' => 'Villa Rate Test',
            'slug' => 'villa-rate-test',
            'description' => 'Test description',
            'base_price' => 500.00,
            'capacity_adults' => 4,
            'capacity_children' => 2,
            'size_sqm' => 100,
            'bed_type' => '2 King Beds',
            'featured_image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
            'total_inventory' => 2,
            'is_active' => true,
        ]);

        $response = $this->post("/admin/rates/room/{$room->id}", [
            'base_price' => 550.00,
        ]);

        $room->refresh();
        $this->assertEquals(550.00, $room->base_price);
    }
}
