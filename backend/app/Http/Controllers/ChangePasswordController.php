<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ChangePasswordRequest;
use Symfony\Component\HttpFoundation\Response;


class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    { 
        return $this->getPasswordResetTableRow($request)->count()>0? $this->changePassword($request):
        $this->tokenNotFoundResponse();
    }

    public function process1(ChangePasswordRequest $request)
    { 
        return $this->getPasswordResetTableRow1($request)->count()>0? $this->changePassword1($request):
        $this->tokenNotFoundResponse();
    }


    //recuperation des identifiants dans la table password reset
    private function getPasswordResetTableRow($request)
    {

        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }

    private function getPasswordResetTableRow1($request)
    {

        return DB::table('add_passwords_tokens')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }


    private function tokenNotFoundResponse()
    {
        return response()->json([
            
            'error'=>'Ce mail ou ce token n\'existe pas dans notre base de données / Ou vous avez déjà utilisé ce lien !'],401);
    }

  
    private function changePassword($request){
       
             //recuperation de l'utilisatreur par mail
        $user=User::whereEmail($request->email)->first();
        
        //mis à jour du mot de passe de l'utilisateur
        $user->update(['password'=>$request->password]);
        
        //suppresion de la ligne du token donné pour le reset password
        $this->getPasswordResetTableRow($request)->delete();

        //reponse retourné sous format json
        return response()->json([
            'data'=>'Password was successfuly changed'
        ],Response::HTTP_CREATED );
      
       
    }


    private function changePassword1($request){
        if(!!User::where('email',$email)->first()){
        //recuperation de l'utilisatreur par mail
        $user=User::whereEmail($request->email)->first();
        //mis à jour du mot de passe de l'utilisateur
        $user->update(['password'=>$request->password]);
        //suppresion de la ligne du token donné pour le reset password
        $this->getPasswordResetTableRow1($request)->delete();
        //reponse retourné sous format json
        return response()->json([
            'data'=>'Mot de passe ajouté avec succès !'
        ],Response::HTTP_CREATED );
    }
    }

    //function for change the password
    public function changePasswordProfile(Request $request){
        //recuperation de l'utilisatreur par mail
        $user=User::find($request->id);
        //mis à jour du mot de passe de l'utilisateur
        $user->update(['password'=>$request->password]);
        //reponse retourné sous format json
        return response()->json([
            'data'=>'Password profile was successfuly changed'
        ],Response::HTTP_CREATED );
    }
   
}