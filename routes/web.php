<?php

use Illuminate\Support\Facades\Route;

use App\Http\Middleware\RedirectIfAuthenticated;

Route::view('/{path?}', 'welcome')->where('path', '^((?!api).)*$');
// Route::view('login', 'welcome')->withoutMiddleware(['auth']);
// Route::view('register', 'welcome')->withoutMiddleware(['auth']);

