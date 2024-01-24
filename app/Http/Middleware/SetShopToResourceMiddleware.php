<?php

namespace App\Http\Middleware;

use App\Repositories\PartnerRepository;
use Closure;
use Illuminate\Http\Request;

/**
 * Set partner shop to request if request come from user token who is partner
 *
 */
class SetShopToResourceMiddleware
{
    public const NAME = 'app.middlrware.set-partner-shop-to-resource-middleware';

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
        $resource = $request->getResource();
        $resource->setShop($request->getShop());
        return $next($request);
    }
}
