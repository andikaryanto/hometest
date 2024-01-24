<?php

namespace App\GraphQLs\Resolvers;

use Illuminate\Http\Request;
use LaravelCommon\App\Repositories\UserRepository;
use LaravelCommon\App\Services\UserService;
use LaravelCommon\App\ViewModels\User\TokenViewModel;
use LaravelCommon\App\ViewModels\UserCollection;
use LaravelCommon\App\ViewModels\UserViewModel;
use LaravelGraphQL\AbstractResolver;
use LaravelGraphQL\GraphQLException;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Queries\UserQuery;
use LaravelGraphQL\Attributes\Resolver;
use LaravelGraphQL\Attributes\Types\Type;
use LaravelGraphQL\Attributes\Types\PagedCollectionType;
use LaravelGraphQL\Attributes\Description;
use LaravelGraphQL\Attributes\Middleware;
use LaravelGraphQL\Inputs\PaginationInput;
use LaravelGraphQL\Inputs\SortInput;

class UserResolver extends AbstractResolver
{
    protected UserRepository $userRepository;

    protected UserQuery $userQuery;

    protected Request $request;

    protected UserService $userService;

    public function __construct(
        UserRepository $userRepository,
        UserQuery $userQuery,
        Request $request,
        UserService $userService
    ) {
        $this->userRepository = $userRepository;
        $this->userQuery = $userQuery;
        $this->request = $request;
        $this->userService = $userService;
    }

    /**
     * Get all users
     *
     */
    #[Resolver(Resolver::QUERY)]
    #[PagedCollectionType('User')]
    #[Description('Get all users data')]
    #[Middleware([CheckTokenMiddleware::class])]
    final public function users(PaginationInput $paging, SortInput $sort)
    {
        $this->userQuery->orderBy($sort->getField(), $sort->getDirection())
            ->paging($paging->getSize(), $paging->getPage());
        return (new UserCollection($this->userQuery, $this->request));
    }

    /**
     * Get user by id
     */
    #[Resolver(Resolver::QUERY)]
    #[Type('User')]
    #[Description('Get a user')]
    #[Middleware([CheckTokenMiddleware::class])]
    final public function user(int $id)
    {
        $user = $this->userRepository->find($id);
        if (empty($user)) {
            return null;
        }
        return (new UserViewModel($user, $this->request));
    }


    /**
     * Generate user token
     *
     */
    #[Resolver(Resolver::MUTATION)]
    #[Type('Token')]
    #[Description('Generate user token')]
    final public function generateToken(string $username, string $password)
    {

        $userToken = $this->userService->generateToken($username, $password);
        if (is_null($userToken)) {
            throw new GraphQLException('Failed to generate token');
        }

        return (new TokenViewModel($userToken));
    }
}
