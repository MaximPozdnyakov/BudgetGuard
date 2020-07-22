<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

use Illuminate\Support\Facades\Auth;

use App\Wallet;
use App\Transaction;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('checkAuth', function () {
            
        });
        
        Gate::define('add-transaction', function ($walletId) {
            return Auth::check() && Wallet::findOrFail($walletId)::where('owner', Auth::id())->first();;
        });

        Gate::define('authOrFail', function () {
            return Auth::check();
        });

        Gate::define('update-delete-transaction', function ($transactionId) {
            return Auth::check() && Transaction::findOrFail($transactionId)::where('owner', Auth::id())->first();
        });

        
    }
}
