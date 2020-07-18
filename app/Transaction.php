<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';
    protected $fillable = [
        'moneyAmount',
        'moneySign',
        'category',
        'spent_at',
        'description'
    ];
}
