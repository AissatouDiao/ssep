<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activitepartenaireassocie;

class ActivitepartenaireassocieController extends Controller
{
    public function getActivitePartenaireAssocie(){
        $apas=Activitepartenaireassocie::all();
        return $apas;
    }
}
