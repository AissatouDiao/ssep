<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\AddPasswordMail;
use Illuminate\Http\Response;
Use App\Mail\ResetPasswordMail;
Use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request){
        //recupération de tous les éléments de la requête
        //return $request->all();

        //si l'email existe dans la BD, une réponse est envoyée
        if($this->validateEmail($request->email)==false){
          return $this->failedResponse($request->email);

        }

        $this->send($request->email); 
        return $this->succesResponse();
    }

    public function sendEmailAfterSignUpForPassword(){
        //si l'email existe dans la BD, une réponse est envoyée
        if($this->validateEmail($request->email)){
            $this->sendAddPassswordMail($request->email); 
            return $this->succesResponse();
           
        }else{
            return $this->failedResponse($request->email);
        }
    }




    /**
     * Checker si le mail est dans la BD
     */
    public function validateEmail($email){
        //'!!' mettre une marque booléenne
        return !!User::where('email',$email)->first();
        
    }

    /**
     * Rerourne une réponse json
     */
    public function failedResponse($email){

        return response()->json([
            'error'=> 'this email doesn\'t exist in our database'
        ], Response::HTTP_NOT_FOUND);
    }

     /**
     * Rerourne une réponse json
     */
    public function succesResponse(){

        return response()->json([
            'data'=>'Reset Email is send succesfully, please check your email'
        ], Response::HTTP_OK);
    }

    /**
     * Envoie le template mail créée à l'adresse email donné
     */
    public function send($email){
        
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function sendAddPassswordMail($email){
        
        $token = $this->createToken($email);
        Mail::to($email)->send(new AddPasswordMail($token));
    }

/**
 *  création et sauvegarde du token
 *  pour éviter des doublons dans la table password_resets
 *  il est vérifié et eventuellement récupéré la présence de token pour le mail donné
 *  S'il y en déja un c'est celui ci qui sera renvoyé, dans le cas contraire il en est créé un nouveau
 * 
 */
    public function createToken($email){

        $old_token= DB::table('password_resets')->where('email',$email)->first();
        if ($old_token){
            return $old_token;
        }
        $token= Str::random(60);
        $this ->saveToken($token,$email);
        return $token;
    }

    /**
     * Sauvegarde dans la base de données du token crée
     */
    public function saveToken($token, $email){
        DB::table('password_resets')->insert([
            'email'=> $email,
            'token'=>$token,
            'created_at'=> Carbon::now()
        ]);
    }
}
