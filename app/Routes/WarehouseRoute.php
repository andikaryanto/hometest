<?php

namespace App\Routes;

use App\Http\Controllers\WarehouseController;
use App\Http\Middleware\Hydrators\WarehouseHydratorMiddleware;
use App\Http\Middleware\RequestValidatorMiddleware\WarehouseRequestValidatorMiddleware;
use Illuminate\Support\Facades\Route;
use LaravelCommon\App\Http\Middleware\CheckScopeMiddleware;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Http\Middleware\UnitOfWorkMiddleware;
use LaravelCommon\App\Http\Middleware\ResourceValidationMiddleware;
use LaravelCommon\App\Routes\CommonRoute;

class WarehouseRoute extends CommonRoute
{
    /**
     * register shop route
     *
     * @return void
     */
    public static function register()
    {
        return Route::prefix('warehouse')->group(function () {
            Route::middleware(
                [
                    // CheckTokenMiddleware::class,
                    // CheckScopeMiddleware::class . ':marketOrganizer,superadmin'
                ]
            )->group(function () {
                    Route::get('/list', [WarehouseController::class, 'getAll']);

                    Route::post('/store', [WarehouseController::class, 'store'])
                    ->middleware(
                        [
                            WarehouseRequestValidatorMiddleware::class . ':post',
                            WarehouseHydratorMiddleware::class . ':post',
                            ResourceValidationMiddleware::class,
                            UnitOfWorkMiddleware::class . ':persist'
                        ]
                    );
                    Route::get('/{warehouse}', [WarehouseController::class, 'get'])
                        ->middleware(
                            WarehouseHydratorMiddleware::class . ':get'
                        );
                    Route::patch('/{warehouse}', [WarehouseController::class, 'patch'])
                    ->middleware(
                        [
                            WarehouseHydratorMiddleware::class . ':patch',
                            ResourceValidationMiddleware::class,
                            UnitOfWorkMiddleware::class . ':persist'
                        ]
                    );
                    Route::delete('/{warehouse}', [WarehouseController::class, 'delete'])
                    ->middleware(
                        [
                            WarehouseHydratorMiddleware::class . ':get',
                            UnitOfWorkMiddleware::class . ':remove'
                        ]
                    );
            });
        });
    }
}
