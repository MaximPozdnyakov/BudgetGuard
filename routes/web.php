<?php

use Illuminate\Support\Facades\Route;

use App\Http\Middleware\RedirectIfAuthenticated;

use App\Http\Middleware\Cors;


Route::view('/{path?}', 'welcome')->where('path', '^((?!api).)*$');

Route::get('api/redirect/google', 'Auth\LoginController@redirectToProvider');
Route::get('api/google/callback', 'Auth\LoginController@handleProviderCallback');
Route::get('api/google/me', 'Auth\LoginController@me');
Route::get('api/google/logout', 'Auth\LoginController@logout');
