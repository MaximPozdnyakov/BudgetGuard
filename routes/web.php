<?php

use Illuminate\Support\Facades\Route;

use App\Http\Middleware\RedirectIfAuthenticated;

Auth::routes();

Route::view('/{path?}', 'welcome')->where('path', '^((?!api).)*$')->middleware('auth');
Route::view('login', 'welcome')->middleware(RedirectIfAuthenticated::class)->withoutMiddleware(['auth']);
Route::view('register', 'welcome')->middleware(RedirectIfAuthenticated::class)->withoutMiddleware(['auth']);

