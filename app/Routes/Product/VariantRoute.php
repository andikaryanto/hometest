<?php

namespace App\Routes\Product;

use App\Http\Controllers\Product\VariantController;
use App\Http\Middleware\Hydrators\ProductHydratorMiddleware;
use App\Http\Middleware\Hydrators\Product\VariantHydratorMiddleware;
use App\Http\Middleware\Hydrators\ShopHydratorMiddleware;
use App\Http\Middleware\ShopBelongsToPartnerMiddleware;
use App\Http\Middleware\SetPartnerToRequestMiddleware;
use Illuminate\Support\Facades\Route;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Http\Middleware\UnitOfWorkMiddleware;
use LaravelCommon\App\Http\Middleware\UserScopeMiddeware;
use LaravelCommon\App\Routes\CommonRoute;

class VariantRoute extends CommonRoute
{
    /**
     * register product-category route
     *
     * @return void
     */
    public static function register()
    {
        Route::middleware([CheckTokenMiddleware::class])->group(function () {
            Route::get('/shop/{shop}/product/{product}/variants', [VariantController::class, 'getAll'])
                ->middleware([
                    UserScopeMiddeware::class . ':isPartner',
                    SetPartnerToRequestMiddleware::class,
                    ShopHydratorMiddleware::class . ':get',
                    ShopBelongsToPartnerMiddleware::class,
                    ProductHydratorMiddleware::class . ':get'
                ]);

            Route::post('/shop/{shop}/product/variant', [VariantController::class, 'store'])
                ->middleware(
                    [
                        UserScopeMiddeware::class . ':isPartner',
                        SetPartnerToRequestMiddleware::class,
                        ShopHydratorMiddleware::class . ':get',
                        ShopBelongsToPartnerMiddleware::class,
                        VariantHydratorMiddleware::class . ':post',
                        UnitOfWorkMiddleware::class . ':persist'
                    ]
                );

            // Route::get('/{category}', [CategoryController::class, 'get'])->middleware('HydratorMiddleware.product-category');
            // Route::patch('/{category}', [CategoryController::class, 'patch'])
            //     ->middleware(
            //         [
            //             CategoryHydratorMiddleware::class,
            //             ResourceValidationMiddleware::class,
            //             UnitOfWork::class
            //         ]
            //     );
            // Route::delete('/{category}', [CategoryController::class, 'delete'])->middleware(
            //     [
            //         CategoryHydratorMiddleware::class,
            //         UnitOfWork::class
            //     ]
            // );
        });
    }
}
