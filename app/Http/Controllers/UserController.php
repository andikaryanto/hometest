<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\App\Models\User;
use LaravelCommon\App\Queries\ScopeQuery;
use LaravelCommon\App\Queries\UserQuery;
use LaravelCommon\App\Services\UserService;
use LaravelCommon\App\ViewModels\User\TokenViewModel;
use LaravelCommon\App\ViewModels\UserCollection;
use LaravelCommon\App\ViewModels\UserViewModel;
use LaravelCommon\Exceptions\ResponsableException;
use LaravelCommon\Responses\BadRequestResponse;
use LaravelCommon\Responses\PagedJsonResponse;
use LaravelCommon\Responses\ResourceCreatedResponse;
use LaravelCommon\Responses\SuccessResponse;
use LaravelCommon\Utilities\Database\UnitOfWork;

class UserController extends Controller
{
    protected ScopeQuery $scopeQuery;
    protected UserService $userService;
    protected UserQuery $userQuery;
    protected UnitOfWork $unitOfWork;

    public function __construct(
        ScopeQuery $scopeQuery,
        UserService $userService,
        UserQuery $userQuery,
        UnitOfWork $unitOfWork
    ) {
        $this->userQuery = $userQuery;
        $this->userService = $userService;
        $this->scopeQuery = $scopeQuery;
        $this->unitOfWork = $unitOfWork;
    }
    /**
     * Display user list page
     */
    public function getAll(Request $request): PagedJsonResponse
    {
        return new PagedJsonResponse('OK', ResponseConst::OK, new UserCollection($this->userQuery, $request));
    }

    public function store(Request $request): ResourceCreatedResponse
    {
        /**
         * @var User
         */
        $user = $request->getResource();

        if (!$request->get('scopes', null)) {
            throw new ResponsableException('Scope harus diisi', new BadRequestResponse('Scope harus diisi'));
        }

        if (count($request->scopes) == 0) {
            throw new ResponsableException('Scope harus diisi', new BadRequestResponse('Scope harus diisi'));
        }

        $scopeIds = [];
        foreach ($request->scopes as $scope) {
            $scopeIds[] = $scope['id'];
        }

        $scopes = $this->scopeQuery->whereIdIn($scopeIds)->getIterator();
        $user->setScopes($scopes);
        return new ResourceCreatedResponse('OK', ResponseConst::OK, new UserViewModel($user, $request));
    }

    public function login(Request $request) 
    {
        $token = $this->userService->generateToken($request->email, $request->password);
        $this->unitOfWork->flush();

        return new SuccessResponse('OK', ResponseConst::OK, new TokenViewModel($token, $request));
    }
}
