<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Transaction;
use App\Wallet;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Gate;

class TransactionController extends Controller
{
    /**
     * Display a wallets, where owner is current user.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    { 
        if($request->session()->has('userId')){
            return Transaction::where('owner', $request->session()->get('userId'))->get();
        } else {
            abort(401, "Unauthorized");
        }
    }

    /**
     * Store a newly spent resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'moneyAmount' => 'required|numeric',
            'moneySign' => 'required|boolean',
            'category' => 'required|string',
            'spent_at' => 'required',
            'description' => 'nullable|string',
            'wallet' => 'required',
        ]);
        if($request->session()->has('userId')){
            $wallet = Wallet::findOrFail($request->wallet);
            if($wallet->owner == $request->session()->get('userId', null)){

                $transaction = new Transaction;
                $transaction->moneyAmount = $request->moneyAmount;
                $transaction->moneySign = $request->moneySign;
                $transaction->category = $request->category;
                $transaction->spent_at = $request->spent_at;
                $transaction->description = $request->description;
                $transaction->wallet = $request->wallet;
                $transaction->owner = $request->session()->get('userId');
        
                $transaction->save();
        
                return $transaction;
            } else {
                abort(401, "You can add transaction only to your wallet");
            }
        } else {
            abort(401, "Unauthorized");
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([ 
            'moneyAmount' => 'required|numeric',
            'moneySign' => 'required|boolean',
            'category' => 'required|string',
            'spent_at' => 'required',
            'description' => 'nullable|string'
        ]);

        if($request->session()->has('userId')){
            $transaction = Transaction::findOrFail($id);
            if($transaction->owner == $request->session()->get('userId', null)){
                $transaction->update([
                    'moneyAmount' => $request->moneyAmount,
                    'moneySign' => $request->moneySign,
                    'category' => $request->category,
                    'spent_at' => $request->spent_at,
                    'description' => $request->description
                    ]);
        
                return Transaction::findOrFail($id);
            } else {
                abort(401, "You can update only your transaction");
            }
        } else {
            abort(401, "Unauthorized");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if($request->session()->has('userId')){
            $transaction = Transaction::findOrFail($id);
            if($transaction->owner == $request->session()->get('userId', null)){
                $transaction->delete();
                return $transaction;
            } else {
                abort(401, "You can delete only your transaction");
            }
        } else {
            abort(401, "Unauthorized");
        }
    }
}
