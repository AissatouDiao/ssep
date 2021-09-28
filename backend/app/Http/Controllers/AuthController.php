<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\AddPasswordMail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\AuthController;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email or password doesn\'t exist'], 401);
        }

        return $this->respondWithToken($token);
    }


    /**
     * Création de la méthode d'authentification
     */
    public function signup(SignUpRequest $request){
   
        $user = User::create($request->all());
         $user2 = User::where("email",$request->email)->first();
         $this->sendAddPassswordMail($request->email, $user2);
        return $this->login($request);
     
        
    }

    public function sendAddPassswordMail($email,$user){
        
        $token = $this->createToken($email);
        Mail::to($email)->send(new AddPasswordMail($token,$user));
    }
    public function createToken($email){

        $old_token= DB::table('add_passwords_tokens')->where('email',$email)->first();
        if ($old_token){
            return $old_token;
        }
        $token= Str::random(60);
        $this ->saveToken($token,$email);
        return $token;
    }

    public function saveToken($token, $email){
        DB::table('add_passwords_tokens')->insert([
            'email'=> $email,
            'token'=>$token,
            'created_at'=> Carbon::now()
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return JWTAuth::user();
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user'=> auth()->user()  
        ]);
    }
}