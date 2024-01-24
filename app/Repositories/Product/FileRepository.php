<?php

namespace App\Repositories\Product;

use App\Models\Product\Category;
use App\Models\Product\File;
use App\ViewModels\Product\FileCollection;
use App\ViewModels\Product\FileViewModel;
use LaravelCommon\App\Repositories\Repository;

class FileRepository extends Repository
{
    /**
    * Constrcutor
    */
    public function __construct()
    {
        parent::__construct(File::class);
    }

    /**
     * @inheritDoc
     *
     * @return string
     */
    public function collectionClass(): string
    {
        return FileCollection::class;
    }

    /**
     * @inheritDoc
     *
     * @return stirng
     */
    public function viewModelClass(): string
    {
        return FileViewModel::class;
    }
}
