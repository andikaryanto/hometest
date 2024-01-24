<?php

namespace App\Routes\Product;

use App\Http\Controllers\Product\ProductCategoryController;
use App\Http\Middleware\Hydrators\ProductHydratorMiddleware;
use App\Http\Middleware\Hydrators\ShopHydratorMiddleware;
use App\Http\Middleware\SetPartnerToRequestMiddleware;
use App\Http\Middleware\ShopBelongsToPartnerMiddleware;
use Illuminate\Support\Facades\Route;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Http\Middleware\UnitOfWorkMiddleware;
use LaravelCommon\App\Http\Middleware\UserScopeMiddeware;
use LaravelCommon\App\Routes\CommonRoute;

class ProductCategoryRoute extends CommonRoute
{
    public static function register()
    {
        Route::middleware([CheckTokenMiddleware::class])->group(function () {
            Route::post('/shop/{shop}/product/{product}/categories', [ProductCategoryController::class, 'storeAll'])
                ->middleware(
                    [
                        UserScopeMiddeware::class . ':isPartner',
                        SetPartnerToRequestMiddleware::class,
                        ShopHydratorMiddleware::class . ':get',
                        ShopBelongsToPartnerMiddleware::class,
                        ProductHydratorMiddleware::class . ':get',
                        UnitOfWorkMiddleware::class . ':persist'
                    ]
                );
        });
    }
}
