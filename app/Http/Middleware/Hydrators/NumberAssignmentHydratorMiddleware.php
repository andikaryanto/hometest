<?php

namespace App\Http\Middleware\Hydrators;

use App\Repositories\NumberAssignmentRepository;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;

class NumberAssignmentHydratorMiddleware extends HydratorMiddleware
{
    public function __construct(
        NumberAssignmentRepository $numberAssignmentRepository
    ) {
        parent::__construct('numberAssignment', $numberAssignmentRepository);
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'is_called',
            [$this->model, 'setIsCalled']
        );
    }
}
