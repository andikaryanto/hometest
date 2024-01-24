<?php

use App\Models\Table;
use App\Http\Controllers\TableController;
use App\Queries\TableQuery;
use Codeception\Specify;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\System\Http\Request;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;

class TableControllerTest extends UnitTest
{
    use Specify;
    use ProphecyTrait;


    /**
     * @var TableController
     */
    private TableController $controller;

    public function test()
    {
        $this->beforeSpecify(function () {
            $this->tableQuery =
                $this->prophesize(TableQuery::class);

            $this->lengthAwarePaginator =
                $this->prophesize(LengthAwarePaginator::class);

            $this->request = new Request();

            $this->controller = new TableController(
                $this->tableQuery->reveal()
            );
        });

        $this->describe('->getAll()', function () {
            $this->describe('when tableQuery has data', function () {

                $table = (new Table())
                    ->setId(1)
                    ->setName('table1');


                $collection = new Collection([$table]);

                $this->tableQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn($collection);

                $result = $this->controller->getAll($this->request);

                verify($result)->instanceOf(PagedJsonResponse::class);
            });

            $this->describe('when tableQuery has no data', function () {

                $collection = new Collection([]);

                $this->tableQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn($collection);

                $result = $this->controller->getAll($this->request);

                verify($result)->instanceOf(NoContentResponse::class);
            });
        });
    }
}
