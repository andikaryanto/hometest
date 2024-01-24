<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use LaravelCommon\App\Models\User;
use LaravelCommon\App\Models\User\Token;
use LaravelCommon\App\Services\UserService;

class AuthenticatedSessionController extends Controller
{
    protected UserService $userService;

    /**
     *
     * @param UserService $userService
     */
    public function __construct(
        UserService $userService
    ) {
        $this->userService = $userService;
    }

    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $token = $this->userService->getToken($request->user())->getToken();
        $scopes = $request->user()->getScopes();
        $strScopes = [];
        foreach ($scopes as $scope) {
            $strScopes[] = $scope->getName();
        }
        $tokenCookie = Cookie::make('access_token', $token, 7200, null, null, null, false);
        $scopeCookie = Cookie::make('user_scopes', implode(',', $strScopes), 7200, null, null, null, false, true);
        $userNameCookie = Cookie::make('user_name', $request->user()->getUsername(), 7200, null, null, null, false, true);

        return redirect()->intended(RouteServiceProvider::HOME)
            ->cookie($tokenCookie)
            ->cookie($scopeCookie)
            ->cookie($userNameCookie);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        Cookie::queue(Cookie::forget('access_token'));
        Cookie::queue(Cookie::forget('user_scopes'));
        Cookie::queue(Cookie::forget('user_name'));

        return redirect('/');
    }
}
