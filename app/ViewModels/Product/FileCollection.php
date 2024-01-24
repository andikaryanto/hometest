<?php

namespace App\ViewModels\Product;

use App\Models\Product\File;
use Illuminate\Database\Eloquent\Model;
use LaravelCommon\ViewModels\PaggedCollection;

class FileCollection extends PaggedCollection
{
    /**
     * @inheritdoc
     */
    public function shape(Model $model): FileViewModel|null
    {
        if ($model instanceof File) {
            return new FileViewModel($model, $this->request);
        }
    }
}
