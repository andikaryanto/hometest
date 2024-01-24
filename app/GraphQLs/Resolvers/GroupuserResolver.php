<?php

namespace App\GraphQLs\Resolvers;

use App\GraphQLs\Inputs\GroupuserInput;
use LaravelCommon\App\Models\Groupuser;
use LaravelCommon\App\Repositories\GroupuserRepository;
use LaravelCommon\App\ViewModels\GroupuserCollection;
use LaravelCommon\App\ViewModels\GroupuserViewModel;
use LaravelGraphQL\AbstractResolver;
use LaravelGraphQL\Attributes\Resolver;
use LaravelGraphQL\Attributes\Types\Type;
use LaravelGraphQL\Attributes\Types\PagedCollectionType;
use LaravelGraphQL\Attributes\Description;
use LaravelGraphQL\Attributes\Middleware;
use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Queries\GroupuserQuery;
use LaravelCommon\Utilities\Database\UnitOfWork;
use LaravelGraphQL\Inputs\FilterInput;
use LaravelGraphQL\Inputs\PaginationInput;

class GroupuserResolver extends AbstractResolver
{
    protected GroupuserRepository $groupuserRepository;

    protected GroupuserQuery $groupuserQuery;

    protected UnitOfWork $unitOfWork;


    /**
     *
     * @param UserRepository $groupuserRepository
     * @param EntityManager $unitOfWork
     */
    public function __construct(
        GroupuserRepository $groupuserRepository,
        GroupuserQuery $groupuserQuery,
        UnitOfWork $unitOfWork
    ) {
        $this->groupuserRepository = $groupuserRepository;
        $this->groupuserQuery = $groupuserQuery;
        $this->unitOfWork = $unitOfWork;
    }

    /**
     * Get all groupuser data
     */
    #[Resolver(Resolver::QUERY)]
    #[PagedCollectionType('Groupuser')]
    #[Description('Get all groupuser data')]
    #[Middleware([CheckTokenMiddleware::class])]
    final public function groupusers(PaginationInput $paging, FilterInput $filter)
    {
        if (!empty($filter->getSearch())) {
            $this->groupuserQuery
                ->whereGroupName($filter->getSearch());
        }

        $this->groupuserQuery->paging($paging->getSize(), $paging->getPage());

        return (new GroupuserCollection($this->groupuserQuery));
    }

    /**
     * Create new groupuser
     *
     */
    #[Resolver(Resolver::MUTATION)]
    #[Type('Groupuser')]
    #[Description('Create new groupuser')]
    #[Middleware([CheckTokenMiddleware::class])]
    final public function createGroupuser(GroupuserInput $groupuserInput)
    {
        $groupuser = new Groupuser();
        $groupuser->setGroupname($groupuserInput->getGroupName());
        $groupuser->setDescription($groupuserInput->getDescription());
        $this->unitOfWork->persist($groupuser);
        $this->unitOfWork->flush();
        return (new GroupuserViewModel($groupuser));
    }
}
