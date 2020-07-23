<?php

use Illuminate\Support\Facades\Route;

use App\Http\Middleware\RedirectIfAuthenticated;

use App\Http\Middleware\Cors;


Route::view('/{path?}', 'welcome')->where('path', '^((?!api).)*$');

Route::get('api/redirect/google', 'Auth\LoginController@redirectToProvider');
Route::get('api/google/callback', 'Auth\LoginController@handleProviderCallback');
Route::get('api/google/me', 'Auth\LoginController@me');
Route::get('api/google/logout', 'Auth\LoginController@logout');

Route::group([
    'prefix' => 'api/auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('registration', 'AuthController@registration');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::get('api/wallets', 'API\WalletController@index');
Route::post('api/wallets', 'API\WalletController@store'); 

Route::apiResources(['api/transactions' => 'API\TransactionController']);

