<?php

namespace App\GraphQLs\Resolvers;

use LaravelCommon\App\Http\Middleware\CheckTokenMiddleware;
use LaravelCommon\App\Queries\ScopeQuery;
use LaravelCommon\App\ViewModels\ScopeCollection;
use LaravelGraphQL\AbstractResolver;
use LaravelGraphQL\Attributes\Description;
use LaravelGraphQL\Attributes\Middleware;
use LaravelGraphQL\Attributes\Resolver;
use LaravelGraphQL\Attributes\Types\CollectionType;
use LaravelGraphQL\Inputs\FilterInput;

class ScopeResolver extends AbstractResolver
{
    protected ScopeQuery $scopeQuery;

    public function __construct(
        ScopeQuery $scopeQuery
    ) {
        $this->scopeQuery = $scopeQuery;
    }

    /**
     * Get all scopes
     *
     */
    #[Resolver(Resolver::QUERY)]
    #[CollectionType('Scope')]
    #[Description('Get all scopes data')]
    #[Middleware([CheckTokenMiddleware::class])]
    final public function scopes(FilterInput $filter)
    {
        if ($filter->getSearch()) {
            $this->scopeQuery->where('name', '=', $filter->getSearch());
        }

        return (new ScopeCollection($this->scopeQuery));
    }
}
