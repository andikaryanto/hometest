<?php

namespace App\Http\Middleware;

use App\Queries\PartnerQuery;
use App\Repositories\PartnerRepository;
use Closure;
use Illuminate\Http\Request;

class SetPartnerToRequestMiddleware
{
    public const NAME = 'app.middleware.set-partner-to-request-middleware';

    /**
     * Undocumented variable
     *
     * @var PartnerQuery
     */
    protected PartnerQuery $partnerQuery;

    public function __construct(
        PartnerQuery $partnerQuery
    ) {
        $this->partnerQuery = $partnerQuery;
    }

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
        $user = $request->getUserToken()->getUser();
        $partners = $this->partnerQuery->whereUser($user)->getIterator();
        if ($partners->count() > 0) {
            $partner = $partners->first();
            if (!is_null($partner)) {
                $request->setPartner($partner);
            }
        }

        return $next($request);
    }
}
