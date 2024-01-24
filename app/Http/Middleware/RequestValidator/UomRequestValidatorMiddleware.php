<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class UomRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'name' => 'required'
        ];
    }
}
