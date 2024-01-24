<?php

use App\Models\Warehouse;
use App\Http\Controllers\WarehouseController;
use App\Queries\WarehouseQuery;
use Codeception\Specify;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\SuccessResponse;
use LaravelCommon\System\Http\Request;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;

class WarehouseControllerTest extends UnitTest
{
    use Specify;
    use ProphecyTrait;


    /**
     * @var WarehouseController
     */
    private WarehouseController $controller;

    public function test()
    {
        $this->beforeSpecify(function () {
            $this->warehouseQuery =
                $this->prophesize(WarehouseQuery::class);

            $this->lengthAwarePaginator =
                $this->prophesize(LengthAwarePaginator::class);

            $this->request = new Request();

            $this->controller = new WarehouseController(
                $this->warehouseQuery->reveal()
            );
        });

        $this->describe('->getAll()', function () {
            $this->describe('when warehouseQuery has data', function () {

                $warehouse = (new Warehouse())
                    ->setId(1)
                    ->setName('warehouse1');


                $collection = new Collection([$warehouse]);

                $this->warehouseQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn($collection);

                $result = $this->controller->getAll($this->request);

                verify($result)->instanceOf(PagedJsonResponse::class);
            });

            $this->describe('when warehouseQuery has no data', function () {

                $collection = new Collection([]);

                $this->warehouseQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn($collection);

                $result = $this->controller->getAll($this->request);

                verify($result)->instanceOf(NoContentResponse::class);
            });
        });

        $this->describe('->store()', function () {
            $this->describe('will return SuccessResponse', function () {

                $warehouse = (new Warehouse())
                    ->setId(1)
                    ->setName('warehouse1');

                $this->request->setResource($warehouse);

                $result = $this->controller->get($this->request);
                verify($result)->instanceOf(SuccessResponse::class);
            });
        });

        $this->describe('->patch()', function () {
            $this->describe('will return SuccessResponse', function () {

                $warehouse = (new Warehouse())
                    ->setId(1)
                    ->setName('warehouse1');

                $request = $this->request->setResource($warehouse);

                $result = $this->controller->patch($this->request);
                verify($result)->instanceOf(SuccessResponse::class);
            });
        });

        $this->describe('->delete()', function () {
            $this->describe('will return SuccessResponse', function () {

                $warehouse = (new Warehouse())
                    ->setId(1)
                    ->setName('warehouse1');

                $this->request->setResource($warehouse);

                $result = $this->controller->delete($this->request);
                verify($result)->instanceOf(SuccessResponse::class);
            });
        });
    }
}
