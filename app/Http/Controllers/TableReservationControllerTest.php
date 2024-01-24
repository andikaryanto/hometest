<?php
namespace App\Http\Controllers;

use App\Models\TableReservation;
use App\Http\Controllers\TableReservationController;
use App\Models\User;
use App\Queries\TableReservationQuery;
use App\Services\TableReservationService;
use Codeception\Specify;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use LaravelCommon\App\Models\User\Token;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\System\Http\Request;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;

class TableReservationControllerTest extends UnitTest
{
    use Specify;
    use ProphecyTrait;

    private TableReservationController $controller;

    public function test()
    {
        $this->beforeSpecify(function () {
            $this->tableReservationQuery =
                $this->prophesize(TableReservationQuery::class);
            $this->tableReservationService =
                $this->prophesize(TableReservationService::class);

            $this->lengthAwarePaginator =
                $this->prophesize(LengthAwarePaginator::class);                

            $this->tableReservation = (new TableReservation())
                ->setId(1);
                
            $this->user = (new User())
                ->setId(1);
                
            $this->userToken = (new Token())
                ->setId(1)
                ->setUser($this->user);

            $this->request = new Request();

            $this->controller = new TableReservationController(
                $this->tableReservationQuery->reveal(),
                $this->tableReservationService->reveal()
            );
        });

        $this->describe('->getAll()', function () {
            $this->describe('when tableReservationQuery has data', function () {

                $collection = new Collection([$this->tableReservation]);

                $this->tableReservationQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn($collection);

                $result = $this->controller->getAll($this->request);

                verify($result)->instanceOf(PagedJsonResponse::class);
            });

            $this->describe('when tableReservationQuery has no data', function () {

                $collection = new Collection([]);

                $this->tableReservationQuery->getIterator()
                    ->shouldBeCalled()
                    ->willReturn($collection);

                $result = $this->controller->getAll($this->request);

                verify($result)->instanceOf(NoContentResponse::class);
            });
        });

        $this->describe('->store()', function () {
            $this->describe('when tableReservationQuery has data', function () {
                
                $this->request->setResource($this->tableReservation);
                $this->request->setUserToken($this->userToken);

                $this->tableReservationService
                    ->createReservation($this->tableReservation)
                    ->shouldBeCalled();

                $result = $this->controller->store($this->request);
                verify($result)->instanceOf(ResourceCreatedResponse::class);

            });
        });
    }
}
