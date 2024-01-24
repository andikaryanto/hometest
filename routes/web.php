<?php

use App\Http\Controllers\ProfileController;
use App\Models\Patient;
use App\Models\Payment;
use App\Routes\Web\CheckupRecordRoute;
use App\Routes\Web\ClinicRoute;
use App\Routes\Web\DashboardRoute;
use App\Routes\Web\DiseaseRoute;
use App\Routes\Web\ItemMovementRoute;
use App\Routes\Web\ItemRoute;
use App\Routes\Web\MedicalCheckup\ItemRoute as MedicalCheckupItemRoute;
use App\Routes\Web\MedicalCheckupRoute;
use App\Routes\Web\NumberAssignmentRoute;
use App\Routes\Web\Patient\RegistrationRoute as PatientRegistrationRoute;
use App\Routes\Web\PaymentRoute;
use App\Routes\Web\PersonRoute;
use App\Routes\Web\SettingRoute;
use App\Routes\Web\ShopRoute;
use App\Routes\Web\TreatmentRoute;
use App\Routes\Web\MedicalCheckup\Treatment\IncentiveRoute as MedicalCheckupTreatmentIncentiveRoute;
use App\Routes\Web\UomRoute;
use App\Routes\Web\UserRoute;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check()) {
        // User is authenticated
        // Your logic here
        return Inertia::render('Dashboard');
    } else {
        // User is not authenticated
        // Your logic for unauthenticated users
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

CheckupRecordRoute::register();
ClinicRoute::register();
DashboardRoute::register();
DiseaseRoute::register();
ItemRoute::register();
ItemMovementRoute::register();
MedicalCheckupRoute::register();
MedicalCheckupItemRoute::register();
MedicalCheckupTreatmentIncentiveRoute::register();
NumberAssignmentRoute::register();
PatientRegistrationRoute::register();
PaymentRoute::register();
PersonRoute::register();
TreatmentRoute::register();
UomRoute::register();
UserRoute::register();
SettingRoute::register();
ShopRoute::register();
