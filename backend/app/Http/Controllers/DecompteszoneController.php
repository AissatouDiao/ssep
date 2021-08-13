<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Decompteszone;
use Illuminate\Support\Facades\File;


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
                "libelle"=>$request->libelle,
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

       $document = $request->file('decompte');
       
       $decompte=Decompteszone::find($request->id);
       
       if($decompte->decompte!=$request->decompte)
       { 
           File::delete($decompte->decompte);
           $path;
            if($document){
            $repertoire='./documents/zones/decomptes';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $decompte->libelle=$request->libelle;
            $decompte->zone_id=$request->zone_id;
            $decompte->decompte=$path;

           $decompte->save();

            return response()->json([
                "message"=>"La décompte a été mis à jour avec succès  !",
                 "error"=>"La décompte n'a pu être mise à jour, veuillez revoir les données remplies."
            ]); }
       }

       $decompte->libelle=$request->libelle;
       $decompte->zone_id=$request->zone_id;
       $decompte->decompte=$request->decompte;
       
       $decompte->save();
       return response()->json([
           "message"=>"La décompte mis à jour avec succès !",
            "error"=>"La décompte n'a pu être mise à jour, veuillez revoir les données remplies."
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
