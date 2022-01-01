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
}
