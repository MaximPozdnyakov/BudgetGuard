<?php

namespace App\Http\Controllers\API;

use App\Wallet;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Gate;

class WalletController extends Controller
{
    /**
     * Display a wallets, where owner is current user.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Gate::authorize('authOrFail');

        return Wallet::where('owner', Auth::id())->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'initialBalance' => 'required|numeric',
            'title' => 'required|string',
        ]);

        Gate::authorize('authOrFail');

        $wallet = new Wallet;
        $wallet->title = $request->title;
        $wallet->initialBalance = $request->initialBalance;
        $wallet->owner = Auth::id();

        $wallet->save();

        return $wallet;
    }
}
