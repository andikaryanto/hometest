<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class DiseaseRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'code' => 'required',
            'name' => 'required'
        ];
    }
}
