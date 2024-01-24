<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use LaravelCommon\App\Consts\ResponseConst;
use LaravelCommon\Exceptions\ResponsableException;
use LaravelCommon\Responses\BadRequestResponse;
use LaravelCommon\Responses\NoContentResponse;

/**
 * Set partner shop to request if request come from user token who is partner
 *
 */
class ShopBelongsToPartnerMiddleware
{
    public const NAME = 'app.middleware.shop-belongs-to-partner-middleware';

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
        $partnerShops = $request->getPartnerShops();
        $resource = $request->getResource();
        foreach ($partnerShops as $partnerShop) {
            if ($partnerShop->getId() == $resource->getId()) {
                $request->setShop($resource);
                return $next($request);
            }
        }

        return new BadRequestResponse('Shop does not belongs to this partner', ResponseConst::INVALID_DATA);
    }
}
