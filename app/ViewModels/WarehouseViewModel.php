<?php

namespace App\ViewModels;

use App\Models\Warehouse;
use LaravelCommon\ViewModels\AbstractViewModel;

class WarehouseViewModel extends AbstractViewModel
{
    /**
     * @var bool $autoAddResource;
     */
    protected $isAutoAddResource = true;

    /**
     * @var Warehouse
     */
    protected $model;

    /**
     *
     * @inheritdoc
     */
    public function link()
    {
        return '/warehouse/' . $this->model->getId();
    }

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
            'description' => $this->model->getDescription()
        ];
    }
}
