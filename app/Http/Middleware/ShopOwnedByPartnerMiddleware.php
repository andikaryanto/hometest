<?php

namespace App\Http\Middleware;

use App\Models\Shop;
use App\Repositories\PartnerRepository;
use Closure;
use Illuminate\Http\Request;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\Responses\BadRequestResponse;

/**
 * Set partner shop to request if request come from user token who is partner
 *
 */
class ShopOwnedByPartnerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @param  string|null  ...$guards
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        if (is_null($request->getPartner())) {
            return new BadRequestResponse('User is not a partner', ResponseConst::INVALID_DATA);
        }

        $resource = $request->getResource();
        $partner = $request->getPartner();

        if ($resource instanceof Shop) {
            if ($partner->getShops()->count() == 0) {
                return new BadRequestResponse('Partner does not have any shop', ResponseConst::INVALID_DATA);
            }

            $isShopOwnedByPartnerMiddleware = false;
            foreach ($partner->getShops() as $partnerShop) {
                if ($resource->isEqualTo($partnerShop)) {
                    $isShopOwnedByPartnerMiddleware = true;
                    break;
                }
            }

            if (!$isShopOwnedByPartnerMiddleware) {
                return new BadRequestResponse('Shop is not owned by partner', ResponseConst::INVALID_DATA);
            }
        }

        return $next($request);
    }
}
