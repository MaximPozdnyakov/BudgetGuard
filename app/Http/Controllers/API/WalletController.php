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
    public function index(Request $request)
    {
        if($request->session()->has('userId')){
            return Wallet::where('owner', $request->session()->get('userId'))->get();
        } else {
            abort(401, "Unauthorized");
        }
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
        if($request->session()->has('userId')){

            $wallet = new Wallet;
            $wallet->title = $request->title;
            $wallet->initialBalance = $request->initialBalance;
            $wallet->owner = $request->session()->get('userId');

            $wallet->save();

            return $wallet;
        } else {
            abort(401, "Unauthorized");
        }
    }
}
