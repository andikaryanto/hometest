<?php

namespace App\Routes\Web;

use App\Http\Controllers\Web\UserController;
use LaravelCommon\App\Routes\CommonRoute;
use Illuminate\Support\Facades\Route;

class UserRoute extends CommonRoute
{
 /**
     * register warehouse route
     *
     * @return void
     */
    public static function register()
    {
        Route::get('/app-users', [UserController::class, 'index'])->middleware(['auth', 'verified']);
        Route::get('/app-user/add', [UserController::class, 'add'])->middleware(['auth', 'verified']);
    }
}
