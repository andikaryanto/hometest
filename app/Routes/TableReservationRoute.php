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
                CheckScopeMiddleware::class . ':admin,customer'
            ]
        )->group(function () {
            Route::post('/table-reservation', [TableReservationController::class, 'store'])
                ->middleware([
                    TableReservationRequestValidatorMiddleware::class . ':post',
                    TableReservationHydratorMiddleware::class . ':post',
                    UnitOfWorkMiddleware::class . ':commit'
                ]);
        });
    }
}
