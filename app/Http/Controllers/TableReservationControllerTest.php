<?php

namespace App\Http\Controllers;

use App\Models\TableReservation;
use App\Http\Controllers\TableReservationController;
use App\Models\Table;
use App\Models\User;
use App\Queries\TableReservationQuery;
use App\Services\TableReservationService;
use Codeception\Specify;
use Illuminate\Database\Eloquent\Collection;
use LaravelCommon\App\Models\User\Token;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\Responses\SuccessResponse;
use LaravelCommon\System\Http\Request;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;
use LaravelCommon\Utilities\Database\UnitOfWork;

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

            $this->unitOfWork =
                $this->prophesize(UnitOfWork::class);

            $this->table = (new Table())
                ->setId(1);

            $this->tableReservation = (new TableReservation())
                ->setId(1)
                ->setTablee($this->table);

            $this->user = (new User())
                ->setId(1);

            $this->userToken = (new Token())
                ->setId(1)
                ->setUser($this->user);

            $this->request = new Request();

            $this->controller = new TableReservationController(
                $this->tableReservationQuery->reveal(),
                $this->tableReservationService->reveal(),
                $this->unitOfWork->reveal()
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

        $this->describe('->patch()', function () {
            $this->describe('when table reservation is complete', function () {
                $this->tableReservation->setIsComplete(true);

                $this->request->setResource($this->tableReservation);

                $this->unitOfWork->persist($this->table)
                    ->shouldBeCalled();

                $result = $this->controller->patch($this->request);
                verify($result)->instanceOf(SuccessResponse::class);
            });
        });
    }
}
