<?php

namespace App\ViewModels;

use App\Models\TableReservation;
use LaravelCommon\App\ViewModels\UserViewModel;
use LaravelCommon\ViewModels\AbstractViewModel;

class TableReservationViewModel extends AbstractViewModel
{
    /**
     * @var bool $autoAddResource;
     */
    protected $isAutoAddResource = true;

    /**
     * @var TableReservation
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
        $table = $this->model->getTablee();
        if ($table) {
            $this->embedResource('table', new TableViewModel($table, $this->request));
        }

        $user = $this->model->getUser();
        if ($user) {
            $this->embedResource('user', new UserViewModel($user, $this->request));
        }

        return $this;
    }

    /**
     * @inheritdoc
     */
    public function toArray()
    {
        return [
            'id' => $this->model->getId(),
            'reserve_at' => $this->model->getReserveAt()->format('Y-m-d H:i'),
            'reserve_for' => $this->model->getReserveFor(),
            'is_complete' => $this->model->getIsComplete()
        ];
    }
}
