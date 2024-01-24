<?php

namespace App\Services;

use App\Models\Table;
use App\Http\Controllers\TableController;
use App\Models\TableReservation;
use App\Queries\TableQuery;
use App\Repositories\TableRepository;
use Codeception\Specify;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\System\Http\Request;
use Prophecy\PhpUnit\ProphecyTrait;
use LaravelCommon\Tests\UnitTest;
use LaravelCommon\Utilities\Database\UnitOfWork;

class TableReservationServiceTest extends UnitTest
{
    use Specify;
    use ProphecyTrait;

    private TableReservationService $service;

    public function test()
    {
        $this->beforeSpecify(function () {
            $this->tableRepository =
                $this->prophesize(TableRepository::class);

            $this->unitOfWork =
                $this->prophesize(UnitOfWork::class);

            $this->service = new TableReservationService(
                $this->tableRepository->reveal(),
                $this->unitOfWork->reveal(),
            );

            $this->table = (new Table())
                ->setId(1)
                ->setIsReserved(false);

            $this->tableReservation = (new TableReservation())
                ->setId(1)
                ->setTablee($this->table);
        });

        $this->describe('->createReservation()', function () {
            $this->describe('when selected table is reserved', function () {
                $this->table->setIsReserved(true);

                $this->tableRepository->find($this->table->getId())
                    ->shouldBeCalled()
                    ->willReturn($this->table);


                try {
                    $result = $this->service->createReservation($this->tableReservation);
                } catch (Exception $e) {
                    verify($e->getMessage())->equals('Table has been reserved by someone else');
                }
            });

            $this->describe('when selected table is NOT reserved', function () {
                $this->tableRepository->find($this->table->getId())
                    ->shouldBeCalled()
                    ->willReturn($this->table);

                $this->unitOfWork->persist($this->table)
                    ->shouldBeCalled();
                    
                $this->unitOfWork->persist($this->tableReservation)
                    ->shouldBeCalled();

                $result = $this->service->createReservation($this->tableReservation);
            });
        });
    }
}
