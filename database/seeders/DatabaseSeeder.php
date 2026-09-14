<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\RoomType;
use App\Models\SeasonalRate;
use App\Models\Booking;
use App\Models\GalleryImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin User
        User::updateOrCreate(
            ['email' => 'admin@grandvistahotel.com'],
            [
                'name' => 'Grand Vista Administrator',
                'password' => Hash::make('password'),
            ]
        );

        // Hero & Gallery Images (High Quality Unsplash Property Photos)
        $galleryData = [
            [
                'title' => 'Panoramas & Oceanfront Pools',
                'category' => 'Exterior',
                'image_url' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=85',
                'caption' => 'Experience sunset infinity views overlooking private crystal waters.',
                'display_order' => 1,
                'is_hero' => true,
            ],
            [
                'title' => 'Executive Ocean Suite',
                'category' => 'Suites',
                'image_url' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=85',
                'caption' => 'Spacious open-plan interior with floor-to-ceiling panoramic glass.',
                'display_order' => 2,
                'is_hero' => true,
            ],
            [
                'title' => 'Lumière Fine Dining Restaurant',
                'category' => 'Dining',
                'image_url' => 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1920&q=85',
                'caption' => 'Michelin-starred culinary experiences paired with rare vintage wines.',
                'display_order' => 3,
                'is_hero' => true,
            ],
            [
                'title' => 'Aura Thermal Spa Sanctuary',
                'category' => 'Amenities',
                'image_url' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=85',
                'caption' => 'Holistic wellness treatments and private hydrotherapy pools.',
                'display_order' => 4,
                'is_hero' => true,
            ],
            [
                'title' => 'Presidential Sky Villa Terrace',
                'category' => 'Suites',
                'image_url' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=85',
                'caption' => 'Private rooftop plunge pool with 360-degree ocean & skyline vistas.',
                'display_order' => 5,
                'is_hero' => false,
            ],
            [
                'title' => 'Beachfront Sunset Lounge',
                'category' => 'Exterior',
                'image_url' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=85',
                'caption' => 'Handcrafted evening cocktails by the ocean waves.',
                'display_order' => 6,
                'is_hero' => false,
            ],
        ];

        foreach ($galleryData as $item) {
            GalleryImage::create($item);
        }

        // Room Types
        $rooms = [
            [
                'name' => 'Deluxe Ocean View King',
                'slug' => 'deluxe-ocean-view-king',
                'description' => 'Sophisticated coastal luxury featuring a king plush bed, marble ensuite bathroom with rain shower, and a private balcony overlooking coastal horizon views.',
                'base_price' => 280.00,
                'capacity_adults' => 2,
                'capacity_children' => 1,
                'size_sqm' => 42,
                'bed_type' => '1 King Bed',
                'amenities' => ['Ocean View', 'Private Balcony', 'High-Speed Wi-Fi', 'Nespresso Bar', 'Marble Bath', 'Smart TV', 'Room Service'],
                'featured_image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'
                ],
                'total_inventory' => 8,
                'is_active' => true,
            ],
            [
                'name' => 'Grand Horizon Executive Suite',
                'slug' => 'grand-horizon-executive-suite',
                'description' => 'Generous living room space, dual vanity master bath with soaking tub, oversized sun terrace, and dedicated butler concierge service.',
                'base_price' => 480.00,
                'capacity_adults' => 3,
                'capacity_children' => 2,
                'size_sqm' => 68,
                'bed_type' => '1 King Bed + Sofa Bed',
                'amenities' => ['Panoramic Ocean View', 'Private Sun Lounge', 'Butler Service', 'Jacuzzi Soaking Tub', 'Executive Lounge Access', 'Premium Bar'],
                'featured_image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
                ],
                'total_inventory' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Presidential Sky Pool Villa',
                'slug' => 'presidential-sky-pool-villa',
                'description' => 'The crown jewel of Grand Vista. Features private infinity pool, outdoor dining pavilion, master suit, and VIP private airport transfer included.',
                'base_price' => 950.00,
                'capacity_adults' => 4,
                'capacity_children' => 2,
                'size_sqm' => 120,
                'bed_type' => '2 Super King Beds',
                'amenities' => ['Private Heated Infinity Pool', 'Rooftop Lounge Deck', '24/7 Chef & Butler', 'VIP Limousine Transfer', 'Bose Sound System'],
                'featured_image' => 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80'
                ],
                'total_inventory' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Garden Botanical Sanctuary Villa',
                'slug' => 'garden-botanical-sanctuary-villa',
                'description' => 'Nestled within private tropical flora gardens with open-air rain shower, private hammock sun deck, and serene natural stone bathtub.',
                'base_price' => 360.00,
                'capacity_adults' => 2,
                'capacity_children' => 2,
                'size_sqm' => 55,
                'bed_type' => '1 King Bed',
                'amenities' => ['Private Garden', 'Outdoor Rain Shower', 'Daybed Deck', 'Aromatherapy Diffuser', 'Bicycle Rental Included'],
                'featured_image' => 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
                'gallery_images' => [
                    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80'
                ],
                'total_inventory' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($rooms as $roomData) {
            RoomType::create($roomData);
        }

        // Seasonal Rate Rules
        SeasonalRate::create([
            'room_type_id' => null, // Global seasonal multiplier
            'title' => 'High Summer Peak Season',
            'start_date' => Carbon::now()->addDays(5)->format('Y-m-d'),
            'end_date' => Carbon::now()->addDays(45)->format('Y-m-d'),
            'rate_multiplier' => 1.20, // +20%
            'is_active' => true,
        ]);

        SeasonalRate::create([
            'room_type_id' => 3, // Specifically for Presidential Villa
            'title' => 'Holidays Executive Rate',
            'start_date' => Carbon::now()->addDays(10)->format('Y-m-d'),
            'end_date' => Carbon::now()->addDays(20)->format('Y-m-d'),
            'fixed_override_price' => 1100.00,
            'is_active' => true,
        ]);

        // Sample Bookings
        $deluxe = RoomType::where('slug', 'deluxe-ocean-view-king')->first();
        $suite = RoomType::where('slug', 'grand-horizon-executive-suite')->first();

        if ($deluxe) {
            Booking::create([
                'confirmation_code' => 'GV-78921A',
                'room_type_id' => $deluxe->id,
                'guest_name' => 'Sophia Vance',
                'guest_email' => 'sophia.vance@example.com',
                'guest_phone' => '+1 (555) 234-5678',
                'check_in' => Carbon::now()->addDays(2)->format('Y-m-d'),
                'check_out' => Carbon::now()->addDays(5)->format('Y-m-d'),
                'adults' => 2,
                'children' => 0,
                'nightly_rate' => 280.00,
                'total_nights' => 3,
                'subtotal' => 840.00,
                'taxes_and_fees' => 100.80,
                'total_amount' => 940.80,
                'status' => 'confirmed',
                'special_requests' => 'Quiet room on higher floor, late check-in expected.',
            ]);
        }

        if ($suite) {
            Booking::create([
                'confirmation_code' => 'GV-94182B',
                'room_type_id' => $suite->id,
                'guest_name' => 'Marcus Sterling',
                'guest_email' => 'm.sterling@example.com',
                'guest_phone' => '+1 (555) 987-6543',
                'check_in' => Carbon::now()->addDays(7)->format('Y-m-d'),
                'check_out' => Carbon::now()->addDays(11)->format('Y-m-d'),
                'adults' => 2,
                'children' => 1,
                'nightly_rate' => 480.00,
                'total_nights' => 4,
                'subtotal' => 1920.00,
                'taxes_and_fees' => 230.40,
                'total_amount' => 2150.40,
                'status' => 'confirmed',
                'special_requests' => 'Anniversary champagne on arrival.',
            ]);
        }
    }
}
