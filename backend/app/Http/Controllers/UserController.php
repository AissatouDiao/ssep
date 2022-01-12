<?php

namespace App\Http\Controllers;

use Notification;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function getnotifications($request){
        $user=User::find($request);
        return $user->notifications;
    }

    public function getunreadnotifications($request){
        $user=User::find($request);
        return $user->unreadNotifications;
    }

    public function getfivelastunreadnotifications($request){
        $user=User::find($request);
        return $user->unreadNotifications()->take(5)->get();
    }

    public function deleteNotification($request){
        DB::table('notifications')->where('id',$request)->delete();
        return response()->json(["message" => "suppression de notification effective !"]); 

    }

    

    

    

}
