<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
   
     /**
     * Display user list page
     */
    public function index(): Response
    {
        return Inertia::render('Home');
    }
}
