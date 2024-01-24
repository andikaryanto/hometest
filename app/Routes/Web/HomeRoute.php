<?php

namespace App\Routes\Web;

use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\UserController;
use LaravelCommon\App\Routes\CommonRoute;
use Illuminate\Support\Facades\Route;

class HomeRoute extends CommonRoute
{
 /**
     * register warehouse route
     *
     * @return void
     */
    public static function register()
    {
        Route::get('/', [HomeController::class, 'index'])->middleware(['auth', 'verified']);
    }
}
