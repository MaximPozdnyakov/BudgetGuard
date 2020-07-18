<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Transaction;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Transaction::all();
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
            'description' => 'nullable|string'
        ]);

        $transaction = new Transaction;
        $transaction->moneyAmount = $request->moneyAmount;
        $transaction->moneySign = $request->moneySign;
        $transaction->category = $request->category;
        $transaction->spent_at = $request->spent_at;
        $transaction->description = $request->description;

        $transaction->save();

        return $transaction;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Transaction::findOrFail($id);
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

        $transaction = Transaction::findOrFail($id)->update([
            'moneyAmount' => $request->moneyAmount,
            'moneySign' => $request->moneySign,
            'category' => $request->category,
            'spent_at' => $request->spent_at,
            'description' => $request->description
            ]);

        return Transaction::findOrFail($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();
        return $transaction;
    }
}
