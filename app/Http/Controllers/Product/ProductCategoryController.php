<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Queries\ProductCategoryQuery;
use App\ViewModels\ProductViewModel;
use Exception;
use Illuminate\Http\Request;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\Responses\ServerErrorResponse;

class ProductCategoryController extends Controller
{
    protected ProductCategoryQuery $productCategoryQuery;

    public function __construct(
        ProductCategoryQuery $productCategoryQuery
    ) {
        $this->productCategoryQuery = $productCategoryQuery;
    }

    public function storeAll(Request $request)
    {
        try {
            /**
             * @var Product $resource
             */
            $resource = $request->getResource();
            $shop = $request->getShop();

            $categoryIds = $request->categories;

            $categories = $this->productCategoryQuery
                ->whereIdIn($categoryIds)
                ->whereShop($shop)
                ->getIterator();

            $resource->setProductCategories($categories);

            return new ResourceCreatedResponse('OK', ResponseConst::OK, new ProductViewModel($resource, $request));
        } catch (Exception $e) {
            return new ServerErrorResponse($e->getMessage());
        }
    }
}
