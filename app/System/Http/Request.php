<?php

namespace App\System\Http;

use App\Models\Partner;
use App\Models\Shop;
use Illuminate\Database\Eloquent\Collection;
use LaravelCommon\Exceptions\ResponsableException;
use LaravelCommon\Responses\BadRequestResponse;
use LaravelCommon\System\Http\Request as HttpRequest;

class Request extends HttpRequest
{
    protected ?Partner $partner = null;
    protected ?Shop $shop = null;

    public function getPartner(): ?Partner
    {
        return $this->partner;
    }

    public function setPartner(Partner $partner): Request
    {
        $this->partner = $partner;
        return $this;
    }

    public function getPartnerShops(): Collection
    {
        if ($this->getPartner()->getShops()->count() == 0) {
            throw new ResponsableException('', new BadRequestResponse('Partner does not have related shop(s)'));
        }
        return $this->getPartner()->getShops();
    }

    public function getShop(): ?Shop
    {
        return $this->shop;
    }

    public function setShop($shop): Request
    {
        $this->shop = $shop;

        return $this;
    }
}
