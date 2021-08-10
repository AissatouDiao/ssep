<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Decompteszone;

class DecompteszoneController extends Controller
{
    public function add(Request $request){

        
        $document = $request->file('decompte');
        $path;
            
        if($document){
            $repertoire='./documents/zones/decomptes';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Decompteszone::create([
                "libelle"=>$request->titre,
                "decompte"=>$path,
                "zone_id"=>$request->zone_id,        
            ]);
            $latest=Decompteszone::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
   
        }
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
        $decompte= Decompteszone::find($request);
        return $decompte; 
    }

    public function getZoneDecompteById( $request){
        $zone= Decompteszone::find($request);
        return $zone; 
    }

    public function getDecompteszones(Request $request){
        $zones= Decompteszone::all();
        return $zones;
    }


}
