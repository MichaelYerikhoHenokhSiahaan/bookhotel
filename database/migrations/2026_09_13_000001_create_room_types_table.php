<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('room_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('base_price', 10, 2);
            $table->integer('capacity_adults')->default(2);
            $table->integer('capacity_children')->default(1);
            $table->integer('size_sqm')->default(35);
            $table->string('bed_type')->default('King Bed');
            $table->json('amenities')->nullable();
            $table->string('featured_image');
            $table->json('gallery_images')->nullable();
            $table->integer('total_inventory')->default(5);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('room_types');
    }
};
