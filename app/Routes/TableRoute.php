<?php

namespace App\Routes;

use App\Http\Controllers\TableController;
use App\Http\Middleware\Hydrators\TableHydratorMiddleware;
use App\Http\Middleware\RequestValidatorMiddleware\TableRequestValidatorMiddleware;
use Illuminate\Support\Facades\Route;
use LaravelCommon\App\Http\Middleware\CheckScopeMiddleware;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Http\Middleware\UnitOfWorkMiddleware;
use LaravelCommon\App\Http\Middleware\ResourceValidationMiddleware;
use LaravelCommon\App\Routes\CommonRoute;

class TableRoute extends CommonRoute
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
                // CheckTokenMiddleware::class,
                // CheckScopeMiddleware::class . ':superadmin,cutomer'
            ]
        )->group(function () {
            Route::get('/tables', [TableController::class, 'getAll']);
        });
    }
}
