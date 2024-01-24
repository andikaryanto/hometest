<?php

namespace App\Http\Controllers;

use App\Queries\WarehouseQuery;
use App\ViewModels\WarehouseCollection;
use App\ViewModels\WarehouseViewModel;
use Exception;
use Illuminate\Http\Request;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\Responses\ServerErrorResponse;
use LaravelCommon\Responses\SuccessResponse;

class WarehouseController extends Controller
{
    /**
     * Undocumented variable
     *
     * @var WarehouseQuery
     */
    protected WarehouseQuery $warehouseQuery;


    /**
     * Undocumented function
     *
     * @param WarehouseQuery $warehouseRepository
     */
    public function __construct(
        WarehouseQuery $warehouseQuery
    ) {
        $this->warehouseQuery = $warehouseQuery;
    }


    /**
     * Get all paged warehouse
     *
     * @return void
     */
    public function getAll(Request $request)
    {

        if ($this->warehouseQuery->getIterator()->count() == 0) {
            return new NoContentResponse('No Data Found', ResponseConst::NO_DATA_FOUND);
        }
        return new PagedJsonResponse('OK', ResponseConst::OK, new WarehouseCollection($this->warehouseQuery, $request));
    }

    /**
     * Get warehouse by id
     *
     * @param Request $request
     * @return void
     */
    public function get(Request $request)
    {
        $resource = $request->getResource();
        return new SuccessResponse('OK', ResponseConst::OK, new WarehouseViewModel($resource, $request));
    }

    /**
     * Save new ware house, see entity-unit middleware, persistence happens there
     *
     * @return SuccessResponse|ServerErrorResponse
     */
    public function store(Request $request)
    {
        try {
            $resource = $request->getResource();

            return new ResourceCreatedResponse('OK', ResponseConst::OK, new WarehouseViewModel($resource));
        } catch (Exception $e) {
            return new ServerErrorResponse($e->getMessage());
        }
    }

    /**
     * patch a column of entity
     *
     * @return SuccessResponse|ServerErrorResponse
     */
    public function patch(Request $request)
    {
        try {
            $resource = $request->getResource();

            return new SuccessResponse('OK', ResponseConst::OK, new WarehouseViewModel($resource));
        } catch (Exception $e) {
            return new ServerErrorResponse($e->getMessage());
        }
    }

    /**
     * patch a column of entity
     *
     * @return SuccessResponse|ServerErrorResponse
     */
    public function delete(Request $request)
    {
        try {
            $resource = $request->getResource();

            return new SuccessResponse('OK', ResponseConst::OK, new WarehouseViewModel($resource));
        } catch (Exception $e) {
            return new ServerErrorResponse($e->getMessage());
        }
    }
}
