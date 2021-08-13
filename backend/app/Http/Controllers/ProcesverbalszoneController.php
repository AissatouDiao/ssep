<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Procesverbalszone;
use Illuminate\Support\Facades\File;

class ProcesverbalszoneController extends Controller
{
    public function add(Request $request){
        
        $document = $request->file('procesverbal');
        $path;
        if($document){
            $repertoire='./documents/zones/procesverbals';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Procesverbalszone::create([
                "libelle"=>$request->libelle,
                "procesverbal"=>$path,
                "zone_id"=>$request->zone_id,        
            ]);
            $latest=Procesverbalszone::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }
    
    public function update(Request $request){

       
       $document = $request->file('procesverbal');
       
       $procesverbal=Procesverbalszone::find($request->id);
       
       if($procesverbal->procesverbal!=$request->procesverbal)
       { 
           File::delete($procesverbal->procesverbal);
           $path;
            if($document){
            $repertoire='./documents/zones/procesverbals';
            $extension=$document->getClientOriginalExtension();
            do {
                $nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
           
    
            $procesverbal->libelle=$request->libelle;
            $procesverbal->zone_id=$request->zone_id;
            $procesverbal->procesverbal=$path;

           $procesverbal->save();

            return response()->json([
                "message"=>"Le Procès-verbal a été mis à jour avec succès  !",
                 "error"=>"Le Procès-verbal n'a pu être mise à jour, veuillez revoir les données remplies."
            ]); }
        }

      
        $procesverbal->libelle=$request->libelle;
        $procesverbal->zone_id=$request->zone_id;
        $procesverbal->procesverbal=$request->procesverbal;
        
     
 
        $procesverbal->save();
        return response()->json([
            "message"=>"Le Procès-verbal mis à jour avec succès !",
             "error"=>"Le Procès-verbal n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    public function delete( $request){
        $procesverbal= Procesverbalszone::find($request);
        $procesverbal->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }
    public function getProcesVerbalById( $request){
        $pv= Procesverbalszone::find($request);
        return $pv; 
    }

    public function getZoneProcesVerbalById( $request){
        $zone= Procesverbalszone::find($request);
        return $zone; 
    }

    public function getProcesverbalszones(Request $request){
        $procesverbals= Procesverbalszone::all();
        return $procesverbals;
    }
}
