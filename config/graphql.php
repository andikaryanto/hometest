<?php

//mapping yaml orm path

use App\GraphQLs\Resolvers\GroupuserResolver;
use App\GraphQLs\Resolvers\ScopeResolver;
use App\GraphQLs\Resolvers\UserResolver;

return [
    'resolvers' => [
        GroupuserResolver::class,
        ScopeResolver::class,
        UserResolver::class
    ],
    'schema_path' => app_path() . '\GraphQLs\Schemas',
    'Query' => [],
    'Mutation'=> []
];