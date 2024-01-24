<?php

namespace App\Routes;

use App\Http\Controllers\UserController;
use App\Http\Middleware\Hydrators\UserHydratorMiddleware;
use App\Http\Middleware\RequestValidator\UserRequestValidatorMiddleware;
use LaravelCommon\App\Routes\CommonRoute;
use Illuminate\Support\Facades\Route;
use LaravelCommon\App\Http\Middleware\CheckScopeMiddleware;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Http\Middleware\UnitOfWorkMiddleware;

class UserRoute extends CommonRoute
{
    /**
     * register warehouse route
     *
     * @return void
     */
    public static function register()
    {
        return
            Route::middleware(
                [
                    // CheckTokenMiddleware::class,
                    // CheckScopeMiddleware::class . ':admin'
                ]
            )->group(function () {
                // Route::get('/app-users', [UserController::class, 'getAll']);

                Route::post('/app-user', [UserController::class, 'store'])
                    ->middleware(
                        [
                            UserRequestValidatorMiddleware::class . ':post',
                            UserHydratorMiddleware::class . ':post',
                            UnitOfWorkMiddleware::class . ':persist'
                        ]
                    );
                Route::post('/app-user/login', [UserController::class, 'login'])
                    ->middleware(
                        [

                        ]
                    );
                // Route::get('/app-user/{user}', [UserController::class, 'get'])
                //     ->middleware(
                //         UserHydratorMiddleware::class . ':get'
                //     );
                // Route::patch('/app-user/{user}', [UserController::class, 'patch'])
                //     ->middleware(
                //         [
                //             UserHydratorMiddleware::class . ':patch',
                //             UnitOfWorkMiddleware::class . ':persist'
                //         ]
                //     );
                // Route::delete('/app-user/{user}', [UserController::class, 'delete'])
                //     ->middleware(
                //         [
                //             UserHydratorMiddleware::class . ':get',
                //             UnitOfWorkMiddleware::class . ':remove'
                //         ]
                //     );
            });
    }
}
