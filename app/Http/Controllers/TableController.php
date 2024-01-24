<?php

namespace App\Http\Controllers;

use App\Queries\TableQuery;
use App\ViewModels\TableCollection;
use App\ViewModels\TableViewModel;
use Exception;
use Illuminate\Http\Request;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\Responses\NoContentResponse;
use LaravelCommon\Responses\PagedJsonResponse;

class TableController extends Controller
{
    /**
     * Undocumented variable
     *
     * @var TableQuery
     */
    protected TableQuery $tableQuery;


    /**
     * Undocumented function
     *
     * @param TableQuery $tableRepository
     */
    public function __construct(
        TableQuery $tableQuery
    ) {
        $this->tableQuery = $tableQuery;
    }


    /**
     * Get all paged table
     *
     * @return void
     */
    public function getAll(Request $request)
    {

        if ($this->tableQuery->getIterator()->count() == 0) {
            return new NoContentResponse('No Data Found', ResponseConst::NO_DATA_FOUND);
        }
        return new PagedJsonResponse('OK', ResponseConst::OK, new TableCollection($this->tableQuery, $request));
    }
}
