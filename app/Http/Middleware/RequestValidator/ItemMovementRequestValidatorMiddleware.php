<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class ItemMovementRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'movement_type.id' => 'required'
        ];
    }
}
