<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activitepartenairesponsable;

class ActivitepartenaireresponsableController extends Controller
{
    public function getActivitePartenaireResponsable(){
        $aprs=Activitepartenairesponsable::all();
        return $aprs;
    }
}
