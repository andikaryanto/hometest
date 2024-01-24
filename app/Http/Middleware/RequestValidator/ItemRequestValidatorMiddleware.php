<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class ItemRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'code' => 'required',
            'name' => 'required',
            'margin' => 'required',
            'price_per_unit' => 'required',
            'item_type.id' => 'required',
            'uom.id' => 'required'
        ];
    }
}
