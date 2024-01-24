<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class UserRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'username' => 'required',
            'email' => 'required',
            'password' => 'required'
        ];
    }
}
