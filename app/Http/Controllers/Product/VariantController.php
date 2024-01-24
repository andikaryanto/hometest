<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Variant;
use App\Queries\Product\VariantQuery;
use App\ViewModels\Product\VariantCollection;
use App\ViewModels\Product\VariantViewModel;
use Exception;
use Illuminate\Http\Request;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\Responses\ServerErrorResponse;

class VariantController extends Controller
{
    protected VariantQuery $variantQuery;

    public function __construct(
        VariantQuery $variantQuery
    ) {
        $this->variantQuery = $variantQuery;
    }

    public function getAll(Request $request)
    {
        $product = $request->getResource();
        $this->variantQuery->whereProduct($product);

        if ($this->variantQuery->getIterator()->count() == 0) {
            return new NoContentResponse('No Data Found', ResponseConst::NO_DATA_FOUND);
        }

        return new PagedJsonResponse('OK', ResponseConst::OK, new VariantCollection($this->variantQuery, $request));
    }

    public function store(Request $request)
    {
        try {
            /**
             * @var Variant $resource
             */
            $resource = $request->getResource();
            $resource->setSaleableStock($resource->getStock());

            return new ResourceCreatedResponse('OK', ResponseConst::OK, new VariantViewModel($resource, $request));
        } catch (Exception $e) {
            return new ServerErrorResponse($e->getMessage());
        }
    }
}
