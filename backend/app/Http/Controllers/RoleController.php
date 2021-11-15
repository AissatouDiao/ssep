<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Module;
use App\Models\Permission;
use App\Http\Requests\AddRoleRequest;
use Illuminate\Http\Request;
use App\Http\Requests\AddPermissionsRequest;

class RoleController extends Controller
{
    public function addRole(AddRoleRequest $request){
       
        
        Role::create($request->all());
        $lastRecordDate = Role::latest()->first();
        return response()->json([
            "message"=>"Un nouveau rôle a été ajouté !",
            $lastRecordDate,
          
         
        ]);

        /*$users = Role::find(2)->users;

        $Role= User::find(8);

        ;
        Role::create($request->all());
        $lastRecordDate = Role::latest()->first();
        return response()->json([
            "message"=>"Un nouveau rôle a été ajouté !",
            $lastRecordDate,
            "users_par_role"=>$users,
            "role_du_user"=>$Role->role->libelle_role
         
        ]);*/
    }

    public function getroles(Request $request){

       $roles= Role::all();
       return $roles;
    }


    public function getmodules(Request $request){

        $roles= Module::all();
        return $roles;
        
    }

    public function addpermissions(AddPermissionsRequest $request){
    
        
        Permission::create([
            'module_id'=>$request->module_id,
            'role_id'=>$request->role_id,
            'permisions_to_module'=>json_encode($request->permisions_to_module)
        ]);
        return response()->json([
            "message"=>"Module et permissions ajoutés !",
            "error"=>$request->permisions_to_module
        ]);
    }

    public function delete($request){
        $role= Role::find($request);
        $role->delete();
        return response()->json(["message" => "suppression rôle effective!"]); 
        
    }

    public function updaterole(Request $request){
        $role=Role::find($request->id);
        $role->libelle_role=$request->libelle_role;
        $role->save();
        return response()->json(["message" => "modification rôle effective!"]); 
        
    }
}

