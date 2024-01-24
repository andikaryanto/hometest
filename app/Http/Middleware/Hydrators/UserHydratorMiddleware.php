<?php

namespace App\Http\Middleware\Hydrators;

use Illuminate\Support\Facades\Hash;
use LaravelCommon\App\Http\Middleware\HydratorMiddleware;
use LaravelCommon\App\Repositories\UserRepository;

class UserHydratorMiddleware extends HydratorMiddleware
{
    public function __construct(
        UserRepository $userRepository,
    ) {
        parent::__construct('user', $userRepository);
    }

    /**
     * @inheritDoc
     */
    public function hydrate()
    {
        $this->when(
            'username',
            [$this->model, 'setUsername']
        )->when(
            'email',
            [$this->model, 'setEmail']
        );
    }

    /**
     *
     * @inheritdoc
     */
    public function afterHydrate()
    {
        if (strtoupper($this->request->method()) == 'POST' && isset($this->request->password)) {
            $this->model->setPassword(Hash::make($this->request->password));
        }

        return $this;
    }
}
