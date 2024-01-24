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
        UnitOfWork $unitOfWork
    ) {
        $this->scopeQuery = $scopeQuery;
        $this->userService = $userService;
        $this->unitOfWork = $unitOfWork;
    }

    public function store(Request $request): ResourceCreatedResponse
    {
        /**
         * @var User
         */
        $user = $request->getResource();

        if (!$request->get('scopes', null)) {
            throw new ResponsableException('Scope must not null', new BadRequestResponse('Scope must not null'));
        }

        if (count($request->get('scopes')) == 0) {
            throw new ResponsableException('Scope must not null', new BadRequestResponse('Scope must not null'));
        }

        $scopeIds = [];
        foreach ($request->get('scopes') as $scope) {
            $scopeIds[] = $scope['id'];
        }

        $scopes = $this->scopeQuery->whereIdIn($scopeIds)->getIterator();
        $user->setScopes($scopes);
        return new ResourceCreatedResponse('OK', ResponseConst::OK, new UserViewModel($user, $request));
    }

    public function login(Request $request)
    {
        $token = $this->userService->generateToken($request->get('email'), $request->get('password'));
        $this->unitOfWork->flush();

        return new SuccessResponse('OK', ResponseConst::OK, new TokenViewModel($token, $request));
    }
}
