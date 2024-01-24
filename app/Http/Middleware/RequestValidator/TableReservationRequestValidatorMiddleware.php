<?php

namespace App\Http\Middleware\RequestValidator;

use LaravelCommon\App\Http\Middleware\RequestValidatorMiddleware;

class TableReservationRequestValidatorMiddleware extends RequestValidatorMiddleware
{
    public function post()
    {
        return [
            'table.id' => 'required',
            'reserve_at' => 'required'
        ];
    }
}
