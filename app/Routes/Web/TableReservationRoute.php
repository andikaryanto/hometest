<?php

namespace App\Routes\Web;

use App\Http\Controllers\Web\TableReservationController;
use LaravelCommon\App\Routes\CommonRoute;
use Illuminate\Support\Facades\Route;

class TableReservationRoute extends CommonRoute
{
    /**
     * register warehouse route
     *
     * @return void
     */
    public static function register()
    {
        Route::get('/table-reservations', [TableReservationController::class, 'index'])->middleware(['auth', 'verified']);
    }
}
