<?php

namespace App\Http\Controllers;

use Excel;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use App\Imports\EtudiantImport;

class EtudiantController extends Controller
{
    
    public function importForm(){
        return view('import-form');
    }

    public function import(Request $request){
        Excel::import(new EtudiantImport, $request->file);
        return "Record are imported successfully ";
    }



}
