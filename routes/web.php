<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminRateController;
use App\Http\Controllers\AdminRoomController;
use App\Http\Controllers\AdminGalleryController;

/*
|--------------------------------------------------------------------------
| Public Guest Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Gallery Page
Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

// Booking Engine Routes
Route::get('/booking/search', [BookingController::class, 'search'])->name('booking.search');
Route::get('/booking/checkout', [BookingController::class, 'checkout'])->name('booking.checkout');
Route::post('/booking/store', [BookingController::class, 'store'])->name('booking.store');
Route::get('/booking/confirmation/{code}', [BookingController::class, 'confirmation'])->name('booking.confirmation');
Route::get('/booking/lookup', [BookingController::class, 'lookup'])->name('booking.lookup');

/*
|--------------------------------------------------------------------------
| Admin Hotel Management Dashboard Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/bookings', [AdminDashboardController::class, 'bookings'])->name('admin.bookings');
    Route::post('/bookings/{booking}/status', [AdminDashboardController::class, 'updateBookingStatus'])->name('admin.bookings.update-status');

    // Rate Management Dashboard
    Route::get('/rates', [AdminRateController::class, 'index'])->name('admin.rates');
    Route::post('/rates/room/{room}', [AdminRateController::class, 'updateBaseRate'])->name('admin.rates.update-base');
    Route::post('/rates/seasonal', [AdminRateController::class, 'storeSeasonalRate'])->name('admin.rates.store-seasonal');
    Route::delete('/rates/seasonal/{seasonalRate}', [AdminRateController::class, 'destroySeasonalRate'])->name('admin.rates.destroy-seasonal');

    // Room Inventory Management
    Route::get('/rooms', [AdminRoomController::class, 'index'])->name('admin.rooms');
    Route::post('/rooms', [AdminRoomController::class, 'store'])->name('admin.rooms.store');
    Route::put('/rooms/{room}', [AdminRoomController::class, 'update'])->name('admin.rooms.update');
    Route::delete('/rooms/{room}', [AdminRoomController::class, 'destroy'])->name('admin.rooms.destroy');

    // Gallery Showcase Management
    Route::get('/gallery', [AdminGalleryController::class, 'index'])->name('admin.gallery');
    Route::post('/gallery', [AdminGalleryController::class, 'store'])->name('admin.gallery.store');
    Route::delete('/gallery/{image}', [AdminGalleryController::class, 'destroy'])->name('admin.gallery.destroy');
});
