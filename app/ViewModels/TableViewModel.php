<?php

namespace App\ViewModels;

use App\Models\Table;
use LaravelCommon\ViewModels\AbstractViewModel;

class TableViewModel extends AbstractViewModel
{
    /**
     * @var bool $autoAddResource;
     */
    protected $isAutoAddResource = true;

    /**
     * @var Table
     */
    protected $model;

    /**
     *
     * @inheritdoc
     */
    public function link()
    {
        return '#unimplemented';
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
            'is_reserved' => $this->model->getIsReserved()
        ];
    }
}
