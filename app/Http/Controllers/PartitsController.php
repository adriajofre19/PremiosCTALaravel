<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partit;

use Inertia\Inertia;

class PartitsController extends Controller
{

    public function index()
    {
        $partits = Partit::all();
        return Inertia::render('Partits', [
            'partits' => $partits
        ]);
    }

    public function arbitres(){
        return Inertia::render('Arbitres');
    }
}