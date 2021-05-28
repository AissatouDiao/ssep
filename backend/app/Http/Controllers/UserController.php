<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\DeleteuserRequest;

class UserController extends Controller
{
    public function getusers(Request $request){

        $users= User::all();
        return $users;
    }
    public function getuser(){

        $users= JWTAuth::user();
        return $users;
    }

   public function deleteUser( $request){
        $user= User::find($request);
        $user->delete();
        return response()->json(["data" => "suppressonn efective!"]); 
      
    }

    public function updateRoleUser(Request $request){
        $user=User::find($request->id);
        $user->role_id=$request->role_id;
        $user->save();
        return response()->json(["message" => "role mis à jour"]); 
    }

    public function updateProfileUser(Request $request){
        $user=User::find($request->id);
        $user->surname=$request->surname;
        $user->name=$request->name;
        $user->email=$request->email;
        $user->phonenumber=$request->phonenumber;
        $user->adress=$request->adress;
        $user->save();
       return response()->json([
           "message"=>"Profil mis à jour avec succès !",
            "user"=>$user
       ]);

    }

    

}
