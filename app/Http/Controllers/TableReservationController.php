<?php

namespace App\Http\Controllers;

use App\Queries\TableReservationQuery;
use App\Services\TableReservationService;
use App\ViewModels\TableReservationCollection;
use App\ViewModels\TableReservationViewModel;
use Exception;
use Illuminate\Http\Request;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\ResourceCreatedResponse;

class TableReservationController extends Controller
{
    public const CUSTOMER_SCOPE_ID = 1;

    protected TableReservationQuery $tableReservationQuery;
    protected TableReservationService $tableReservationService;


    public function __construct(
        TableReservationQuery $tableReservationQuery,
        TableReservationService $tableReservationService
    ) {
        $this->tableReservationQuery = $tableReservationQuery;
        $this->tableReservationService = $tableReservationService;
    }


    /**
     * Get all paged tableReservation
     *
     * @return void
     */
    public function getAll(Request $request)
    {

        if ($this->tableReservationQuery->getIterator()->count() == 0) {
            return new NoContentResponse('No Data Found', ResponseConst::NO_DATA_FOUND);
        }
        return new PagedJsonResponse('OK', ResponseConst::OK, new TableReservationCollection($this->tableReservationQuery, $request));
    }    


    /**
     * Get all paged tableReservation
     *
     * @return void
     */
    public function store(Request $request)
    {
        $resource = $request->getResource();

        $user = $request->getUserToken()->getUser();               
        $resource->setUser($user);

        $this->tableReservationService->createReservation($resource);
        
        return new ResourceCreatedResponse('OK', ResponseConst::OK, new TableReservationViewModel($resource, $request));
    }
}
