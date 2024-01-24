<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use LaravelCommon\App\Models\User as ModelsUser;
use LaravelCommon\Utilities\Database\UnitOfWork;

class RegisteredUserController extends Controller
{
    protected UnitOfWork $unitOfWork;

    /**
     *
     * @param UnitOfWork $unitOfWork
     */
    public function __construct(
        UnitOfWork $unitOfWork
    ) {
        $this->unitOfWork = $unitOfWork;
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = (new ModelsUser())
            ->setUsername($request->username)
            ->setEmail($request->email)
            ->setPassword(Hash::make($request->password));

        $this->unitOfWork->persist($user);
        $this->unitOfWork->flush();

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
