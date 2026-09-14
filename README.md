# Grand Vista Resort & Spa - Hotel Booking & Showcase Platform

A luxury, mobile-responsive hotel website featuring a full-width showcase slideshow gallery, real-time online booking engine, digital confirmation voucher generator, and comprehensive rate management dashboard.

Built with **Laravel 12**, **MySQL**, **Bootstrap 5**, and **React** (via **Inertia.js**).

---

## Key Features

### 1. Property Showcase & Slideshow Gallery
- **Full-Width Hero Slideshow**: Hardware-accelerated smooth transitions, auto-play with pause-on-hover, touch swipe support, and instant image preloading.
- **Interactive Photo Gallery**: Filterable by category (*Exterior*, *Suites*, *Dining*, *Spa*) with full-resolution lightbox viewing mode (`/gallery`).

### 2. Real-Time Online Booking Engine
- **Live Availability Engine**: Prevents double-booking by computing active room inventory against check-in/check-out date ranges.
- **Dynamic Cost Breakdown**: Automatically calculates nightly rates, weekend surcharges (+15%), seasonal surge multipliers (+20% / +30%), and resort taxes/fees (12%).
- **Digital Reservation Voucher**: Generates instant confirmation passes with unique confirmation codes (e.g. `GV-78921A`), print-ready voucher layouts, and guest request handling.
- **Guest Booking Lookup Portal**: Look up reservation details and digital passes by code (`/booking/lookup`).

### 3. Executive Management Dashboard
- **Revenue & Occupancy Analytics**: Overview of total bookings, gross revenue, occupancy rate %, and check-ins/check-outs scheduled for today (`/admin`).
- **Basic Rate Management Portal**: Real-time base price modifier per room type and seasonal surge rate rule creator (`/admin/rates`).
- **Reservation Manager**: Search bookings, filter by date/status (*Confirmed*, *Checked In*, *Completed*, *Cancelled*), and update guest statuses (`/admin/bookings`).
- **Room Inventory & Media Manager**: Add/edit room categories, amenities, capacity, and slideshow imagery (`/admin/rooms`, `/admin/gallery`).

---

## Tech Stack

- **Framework**: [Laravel 12](https://laravel.com/) (PHP 8.4)
- **Database**: [MySQL](https://www.mysql.com/)
- **Frontend Bridge**: [Inertia.js](https://inertiajs.com/) (Server-driven SPA)
- **UI Framework**: [React 18/19](https://react.dev/)
- **CSS Framework**: [Bootstrap 5.3](https://getbootstrap.com/) + Bootstrap Icons + Custom Luxury Theme

---

## How to Run from Scratch

Follow these step-by-step instructions to set up and run the application on a fresh machine.

### Prerequisites

Ensure you have the following installed on your system:
- **PHP**: `8.2` or higher (with `pdo_mysql` enabled)
- **Composer**: `2.x`
- **Node.js**: `18.x` or higher (with `npm`)
- **MySQL Server**: Running on `127.0.0.1:3306`

---

### Step 1: Clone or Download the Repository

```bash
git clone <repository-url> hotel-booking
cd hotel-booking
```

---

### Step 2: Install Dependencies

Install PHP dependencies using Composer:

```bash
composer install
```

Install JavaScript/React dependencies using NPM:

```bash
npm install
```

---

### Step 3: Environment Setup

Copy the example `.env` file and create your local environment configuration:

```bash
cp .env.example .env
```

Generate the Laravel application key:

```bash
php artisan key:generate
```

Open `.env` and verify your MySQL database configuration:

```env
APP_NAME="Grand Vista Hotel"
APP_ENV=local
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hotel_booking
DB_USERNAME=root
DB_PASSWORD=
```

---

### Step 4: Create & Seed the Database

Ensure your MySQL server is running on `127.0.0.1:3306`. Create the database if it doesn't exist, run the database migrations, and seed initial property imagery, room categories, seasonal rate rules, and sample bookings:

```bash
php artisan migrate:fresh --seed
```

#### Default Admin Credentials

- **Email**: `admin@grandvistahotel.com`
- **Password**: `password`

---

### Step 5: Build Frontend Assets

Compile the React & Bootstrap assets for production:

```bash
npm run build
```

*(Alternatively, for active frontend development with hot module reloading, run `npm run dev` in a separate terminal).*

---

### Step 6: Start the Local Development Server

Run the Laravel development server:

```bash
php artisan serve
```

The application will be accessible at: **[http://localhost:8000](http://localhost:8000)**

---

## Application URL Sitemap

| Page | URL | Description |
| :--- | :--- | :--- |
| **Home Page** | `http://localhost:8000/` | Full-width hero slideshow, booking search bar, property highlights |
| **Rooms Catalog & Search** | `http://localhost:8000/booking/search` | Available rooms, live price breakdown, date filter |
| **Showcase Gallery** | `http://localhost:8000/gallery` | Full property photo gallery with category filter & lightbox |
| **Find Reservation** | `http://localhost:8000/booking/lookup` | Guest booking lookup portal by confirmation code |
| **Admin Dashboard** | `http://localhost:8000/admin` | Executive dashboard overview, occupancy stats, today check-ins |
| **Rate Management** | `http://localhost:8000/admin/rates` | Base rate editor & seasonal surge rate rule creator |
| **Bookings Manager** | `http://localhost:8000/admin/bookings` | Reservation search, status toggle, filter by status |
| **Room Inventory** | `http://localhost:8000/admin/rooms` | Manage room categories, capacity, pricing, amenities |
| **Media Manager** | `http://localhost:8000/admin/gallery` | Manage full-width hero slideshow & gallery photos |

---

## Running Automated Tests

To execute the automated PHPUnit/Laravel feature test suite:

```bash
php artisan test
```

---

## License

This project is open-sourced under the [MIT license](LICENSE).
