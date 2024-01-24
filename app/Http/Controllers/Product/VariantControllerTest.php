<?php

namespace App\Http\Controllers\Product;

use App\Models\ProductCategory;
use App\Models\Product;
use App\Models\Product\Variant;
use App\Queries\Product\VariantQuery;
use Codeception\Specify;
use Illuminate\Database\Eloquent\Collection;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\System\Http\Request;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;

class VariantControllerTest extends UnitTest
{
    use Specify;
    use ProphecyTrait;


    /**
     * @var VariantController
     */
    private VariantController $controller;

    public function test()
    {
        $this->beforeSpecify(function () {
            $this->variantQuery =
                $this->prophesize(VariantQuery::class);

            $this->request = new Request();

            $this->controller = new VariantController(
                $this->variantQuery->reveal()
            );
        });

        $this->describe('->getAll()', function () {
            $this->describe('when variantQuery has data', function () {
                $this->describe('should return PagedJsonResponse', function () {

                    $category = (new ProductCategory())
                        ->setId(1)
                        ->setName('category1');

                    $collection = new Collection([$category]);

                    $product = (new Product())
                        ->setId(1);

                    $this->request
                        ->setResource($product);

                    $this->variantQuery->whereProduct($product)
                        ->shouldBeCalled()
                        ->willReturn($this->variantQuery);

                    $this->variantQuery->getIterator()
                        ->shouldBeCalled()
                        ->willReturn($collection);

                    $result = $this->controller->getAll($this->request);

                    verify($result)->instanceOf(PagedJsonResponse::class);
                });
            });

            $this->describe('when variantQuery has no data', function () {
                $product = (new Product())
                    ->setId(1);

                $this->request
                    ->setResource($product);

                $collection = new Collection();

                $this->variantQuery->whereProduct($product)
                    ->shouldBeCalled()
                    ->willReturn($this->variantQuery);

                $this->variantQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn($collection);

                $result = $this->controller->getAll($this->request);

                verify($result)->instanceOf(NoContentResponse::class);
            });
        });

        $this->describe('->store()', function () {
            $this->describe('will return ResourceCreatedResponse', function () {
                $variant = (new Variant())
                    ->setId(1)
                    ->setStock(10);

                $this->request->setResource($variant);

                $result = $this->controller->store($this->request);
                verify($result)->instanceOf(ResourceCreatedResponse::class);
            });
        });
    }
}
