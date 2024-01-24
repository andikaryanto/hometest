<?php

namespace App\Http\Controllers\Product;

use App\Models\ProductCategory;
use App\Models\Shop;
use App\Models\Product;
use App\Queries\ProductCategoryQuery;
use App\System\Http\Request as HttpRequest;
use Codeception\Specify;
use Illuminate\Database\Eloquent\Collection;
use LaravelCommon\Responses\ResourceCreatedResponse;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;

class ProductCategoryControllerTest extends UnitTest
{
    use Specify;
    use ProphecyTrait;


    /**
     * @var ProductCategoryController
     */
    private ProductCategoryController $controller;

    public function test()
    {
        $this->beforeSpecify(function () {
            $this->productCategoryQuery =
                $this->prophesize(ProductCategoryQuery::class);

            $this->request = new HttpRequest();

            $this->product = (new Product())
                ->setId(1);

            $this->shop = (new Shop())
                ->setId(1);

            $this->productCategory = (new ProductCategory())
                ->setId(1);

            $this->controller = new ProductCategoryController(
                $this->productCategoryQuery->reveal()
            );
        });

        $this->describe('->storeAll()', function () {
            $this->describe('will return ResourceCreatedResponse', function () {
                $this->request->categories = [1];

                $this->request
                    ->setResource($this->product);

                $this->request->setShop($this->shop);

                $this->productCategoryQuery
                    ->whereIdIn([1])
                    ->shouldBeCalled()
                    ->willReturn($this->productCategoryQuery);

                $this->productCategoryQuery
                    ->whereShop($this->shop)
                    ->shouldBeCalled()
                    ->willReturn($this->productCategoryQuery);

                $this->productCategoryQuery
                    ->getIterator()
                    ->shouldBeCalled()
                    ->willReturn(new Collection([$this->productCategory]));

                $result = $this->controller->storeAll($this->request);
                verify($result)->instanceOf(ResourceCreatedResponse::class);
            });
        });
    }
}
