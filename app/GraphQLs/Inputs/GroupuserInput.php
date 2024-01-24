<?php

namespace App\GraphQLs\Inputs;

use LaravelGraphQL\Inputs\AbstractInput;

class GroupuserInput extends AbstractInput
{
    protected string $group_name = '';
    protected string $description = '';

    /**
     * Get the value of groupname
     */
    public function getGroupName()
    {
        return $this->group_name;
    }

    /**
     * Get the value of description
     */
    public function getDescription()
    {
        return $this->description;
    }
}
