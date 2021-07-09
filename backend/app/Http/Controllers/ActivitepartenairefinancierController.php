<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activitepartenairefinancier;

class ActivitepartenairefinancierController extends Controller
{
    public function getActivitePartenaireFinancier(){
        $apfs=Activitepartenairefinancier::all();
        return $apfs;
    }
}
