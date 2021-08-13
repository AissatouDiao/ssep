<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Rapportdactiviteszone;

class RapportdactiviteszoneController extends Controller
{
    public function add(Request $request){


        $document = $request->file('rapportdactivite');
 
        $path;
            
        if($document){
            $repertoire='./documents/zones/rapports';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Rapportdactiviteszone::create([
                "libelle"=>$request->libelle,
                "rapportdactivite"=>$path,
                "zone_id"=>$request->zone_id,        
            ]);
            $latest=Rapportdactiviteszone::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
   
        }
    }
    
    public function update(Request $request){
    

       $document = $request->file('rapportdactivite');
       
       $rapportdactivite=Rapportdactiviteszone::find($request->id);
       
       if($rapportdactivite->rapportdactivite!=$request->rapportdactivite)
       { 
           File::delete($rapportdactivite->rapportdactivite);
           $path;
            if($document){
            $repertoire='./documents/zones/rapports';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $rapportdactivite->libelle=$request->libelle;
            $rapportdactivite->zone_id=$request->zone_id;
            $rapportdactivite->rapportdactivite=$path;

           $rapportdactivite->save();

            return response()->json([
                "message"=>"Le rapport d'activité a été mis à jour avec succès  !",
                 "error"=>"Le rapport d'activité n'a pu être mise à jour, veuillez revoir les données remplies."
            ]); }
       }

      
       $rapportdactivite->libelle=$request->libelle;
       $rapportdactivite->zone_id=$request->zone_id;
       $rapportdactivite->rapportdactivite=$request->rapportdactivite;
       
    

       $rapportdactivite->save();
       return response()->json([
           "message"=>"Le rapport d'activité mis à jour avec succès !",
            "error"=>"Le rapport d'activité n'a pu être mise à jour, veuillez revoir les données remplies."
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
