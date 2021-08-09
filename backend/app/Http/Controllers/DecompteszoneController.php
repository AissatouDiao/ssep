<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Decompteszone;

class DecompteszoneController extends Controller
{
    public function add(Request $request){
        Decompteszone::create($request->all());
        $lastRecordDate = Decompteszone::latest()->first();
        return response()->json([
            "message"=>"Un nouvelle zone a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }
    
    public function update(Request $request){
        $Decompteszone=Decompteszone::find($request->id);
        $Decompteszone->libelle=$request->libelle;
        $Decompteszone->save();
       return response()->json([
           "message"=>"Decompteszone mis à jour avec succès !",
            "Decompteszone"=>$Decompteszone
       ]);
    }

    public function delete( $request){
        $zone= Decompteszone::find($request);
        $zone->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
    }
    public function getDecompteById( $request){
        $zone= Decompteszone::find($request);
        return $zone; 
    }

    public function getDecompteszones(Request $request){
        $zones= Decompteszone::all();
        return $zones;
    }


}
