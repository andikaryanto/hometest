<?php

namespace App\Routes;

use App\Http\Controllers\TableReservationController;
use App\Http\Middleware\Hydrators\TableReservationHydratorMiddleware;
use App\Http\Middleware\RequestValidator\TableReservationRequestValidatorMiddleware;
use Illuminate\Support\Facades\Route;
use LaravelCommon\App\Http\Middleware\CheckScopeMiddleware;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Http\Middleware\UnitOfWorkMiddleware;
use LaravelCommon\App\Routes\CommonRoute;

class TableReservationRoute extends CommonRoute
{
    /**
     * register shop route
     *
     * @return void
     */
    public static function register()
    {
        return Route::middleware(
            [
                CheckTokenMiddleware::class,
            ]
        )->group(function () {
            Route::post('/table-reservation', [TableReservationController::class, 'store'])
                ->middleware([
                    
                    CheckScopeMiddleware::class . ':admin,customer',
                    TableReservationRequestValidatorMiddleware::class . ':post',
                    TableReservationHydratorMiddleware::class . ':post',
                    UnitOfWorkMiddleware::class . ':commit'
                    
                ]);

            Route::get('/table-reservations', [TableReservationController::class, 'getAll'])
                ->middleware([
                    CheckScopeMiddleware::class . ':admin'
                ]);

            Route::patch('/table-reservation/{tableReservation}', [TableReservationController::class, 'patch'])
                ->middleware([
                    
                    CheckScopeMiddleware::class . ':admin',
                    TableReservationHydratorMiddleware::class . ':patch',
                    UnitOfWorkMiddleware::class . ':commit'
                    
                ]);
        });
    }
}
