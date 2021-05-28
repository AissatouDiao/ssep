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


    //recuperation des identifiants dans la table password reset
    private function getPasswordResetTableRow($request)
    {

        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken
        ]);
    }


    private function tokenNotFoundResponse()
    {
        return response()->json([
            'error'=>'this mail or this token wasn\'t found in our database/ Or you have already used this link !']);
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