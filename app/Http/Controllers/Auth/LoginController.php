<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Illuminate\Http\Request;

use App\User;

use Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            return redirect('/');
        }
    }

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function redirectToProvider(Request $request)
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleProviderCallback(Request $request)
    {
        try {
            $user = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect('/login');
        }      
        $existingUser = User::where('email', $user->email)->first();        
        if($existingUser){
            // log them in
            auth()->login($existingUser, true);
        } else {
            // create a new user
            $newUser                  = new User;
            $newUser->name            = $user->name;
            $newUser->email           = $user->email;
            $newUser->password        = Hash::make(Str::random(8));
            $newUser->save();            
            auth()->login($newUser, true);
        }
        $token = $user->token;
        $request->session()->put('token', $token);

        return redirect()->to('/');
    }

    public function me(Request $request)
    {
        $token = $request->session()->get('token', '');
        if ($token == ""){
            abort(401, 'Unauthorized');
        } else {
            $user = Socialite::driver('google')->userFromToken($token);
            if(!$request->session()->has('userId')){
                $userDB = User::where('email', $user->email)->first();
                $request->session()->put('userId', $userDB->id);
            }
            return response()->json($user);
        }
    }

    public function logout(Request $request)
    {
        if($request->session()->has('token')){
            $request->session()->flush();
            $request->session()->regenerate();
            return "";
        } else {
            abort(401, 'Unauthorized');
        }
    }
}
