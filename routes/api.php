<?php

use App\Http\Controllers\TestController;
use App\Routes\CertificateRoute;
use App\Routes\CheckupRecordRoute;
use App\Routes\ClinicRoute;
use App\Routes\DiseaseRoute;
use App\Routes\DoctorRoute;
use App\Routes\GenderRoute;
use App\Routes\HealthWorkerRoute;
use App\Routes\ItemMarginRoute;
use App\Routes\ItemMovementItemRoute;
use App\Routes\ItemMovementRoute;
use App\Routes\ItemRoute;
use App\Routes\MedicalCheckupRoute;
use App\Routes\MovementTypeRoute;
use App\Routes\NumberAssignmentRoute;
use App\Routes\PartnerRoute;
use App\Routes\Patient\RegistrationRoute as PatientRegistrationRoute;
use App\Routes\MedicalCheckup;
use App\Routes\MedicalCheckup\Treatment\IncentiveRoute as MedicalCheckupTreatmentIncentiveRoute;
use App\Routes\PaymentRoute;
use App\Routes\PersonRoute;
use App\Routes\Product;
use App\Routes\ProductCategoryRoute;
use App\Routes\ProductRoute;
use App\Routes\RegistrationTypeRoute;
use App\Routes\SettingRoute;
use App\Routes\ShopRoute;
use App\Routes\TableReservationRoute;
use App\Routes\TableRoute;
use App\Routes\TreatmentRoute;
use App\Routes\UomRoute;
use App\Routes\UserRoute;
use App\Routes\VillageRoute;
use App\Routes\VisitTypeRoute;
use App\Routes\WarehouseRoute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

TableRoute::register();
TableReservationRoute::register();
UserRoute::register();