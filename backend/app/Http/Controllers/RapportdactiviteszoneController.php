<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rapportdactiviteszone;

class RapportdactiviteszoneController extends Controller
{
    public function add(Request $request){
        Rapportdactiviteszone::create($request->all());
        $lastRecordDate = Rapportdactiviteszone::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle zone a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $Rapportdactiviteszone=Rapportdactiviteszone::find($request->id);
        $Rapportdactiviteszone->libelle=$request->libelle;
        $Rapportdactiviteszone->save();
       return response()->json([
           "message"=>"Rapportdactiviteszone mis à jour avec succès !",
            "Rapportdactiviteszone"=>$Rapportdactiviteszone
       ]);
    }

    public function delete( $request){
        $rapportdactivitezone= Rapportdactiviteszone::find($request);
        $rapportdactivitezone->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }
    public function getRapportActiviteById( $request){
        $ra= rapportdactivitezone::find($request);
        return $ra; 
    }

    public function getZoneRapportActiviteById( $request){
        $zone= rapportdactivitezone::find($request);
        return $zone; 
    }

    public function getRapportdactiviteszones(Request $request){
        $rapportdactivitezones= Rapportdactiviteszone::all();
        return $rapportdactivitezones;
    }
}
