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
        $permission=Permission::where([
            'module_id'=>$request->module_id,
            'role_id'=>$request->role_id   
        ]);
        if(!$permission->exists()){
            Permission::create([
                'module_id'=>$request->module_id,
                'role_id'=>$request->role_id,
                'permisions_to_module'=>json_encode($request->permisions_to_module)
            ]);
            return response()->json([
                "message"=>"Module et permissions ajoutés !",
                "error"=>$request->permisions_to_module
            ]);
        }else{
            return response()->json([
                "message"=>"Ce module est déjà ajouté au rôle!",
            ]);
    }
        
      
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

