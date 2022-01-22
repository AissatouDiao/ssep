<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function getPermissions(){
        $permissions=Permission::all();
        return response()->json($permissions);
    }

    public function getPermissionsByRoleId($request){
        $permissions=Permission::where('role_id',$request)->get();
        return $permissions;
    }

    public function updatePermissionsToRole(Request $request){
        $permission=Permission::find($request->id);
        $permission->permisions_to_module=$request->permisions_to_module;
        $permission->save();
        return response()->json(
            ["message"=> "Mis à jour effectué avec succès"]
        );

    }
}
