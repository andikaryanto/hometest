<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class ItemMovementItemRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'item.id' => 'required',
            'uom.id' => 'required',
            'item_movement.id' => 'required',
            'quantity' => 'required',
            'price_per_unit' => 'required'
        ];
    }
}
