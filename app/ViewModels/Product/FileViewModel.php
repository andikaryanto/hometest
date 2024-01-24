<?php

namespace App\ViewModels\Product;

use App\Models\Product\File;
use LaravelCommon\ViewModels\AbstractViewModel;

class FileViewModel extends AbstractViewModel
{
    /**
     * @var bool $autoAddResource;
     */
    protected $isAutoAddResource = true;

    /**
     * @var File
     */
    protected $model;

    /**
     * @inheritdoc
     */
    public function addResource()
    {
        return $this;
    }

    /**
     * @inheritdoc
     */
    public function toArray()
    {
        return [
            'id' => $this->model->getId(),
            'name' => $this->model->getName(),
            'type' => $this->model->getType(),
            'extension' => $this->model->getExtension(),
            'size' => $this->model->getSize(),
        ];
    }
}
