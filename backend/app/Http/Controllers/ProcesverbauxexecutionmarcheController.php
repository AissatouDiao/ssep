<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Procesverbauxexecutionmarche;

class ProcesverbauxexecutionmarcheController extends Controller
{
    
    public function add(Request $request){

        $document = $request->file('procesverbal');
        $path;
        if($document){
            $repertoire='./documents/communes/executionmarche/procesverbaux';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $procesverbal = Procesverbauxexecutionmarche::create([
                "libelle"=>$request->libelle,
                "procesverbal"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Procesverbauxexecutionmarche::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    public function update(Request $request){
        $document = $request->file('procesverbal');
        
        $procesverbal=Procesverbauxexecutionmarche::find($request->id);
        
        if($procesverbal->procesverbal!=$request->procesverbal)
        { 
            File::delete($procesverbal->procesverbal);
            $path;
             if($document){
             $repertoire='./ documents/communes/executionmarche/procesverbaux';
             $extension=$document->getClientOriginalExtension();
             do {
                 $nom = time() .'.' . $extension;
             } while(file_exists( $repertoire . '/' . $nom));
             $document->move( $repertoire, $nom);
             $path=$repertoire.'/'.$nom;
            
     
             $procesverbal->libelle=$request->libelle;
             $procesverbal->commune_id=$request->commune_id;
             $procesverbal->procesverbal=$path;
 
            $procesverbal->save();
 
             return response()->json([
                 "message"=>"Le procesverbal a été mis à jour avec succès  !",
                  "error"=>"Le procesverbal n'a pu être mise à jour, veuillez revoir les données remplies."
             ]); }
        }
 
        $procesverbal->libelle=$request->libelle;
        $procesverbal->commune_id=$request->commune_id;
        $procesverbal->procesverbal=$request->procesverbal;
        
        $procesverbal->save();
        return response()->json([
            "message"=>"Le procesverbal mis à jour avec succès !",
             "error"=>"Le procesverbal n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    public function delete( $request){
        $procesverbal= Procesverbauxexecutionmarche::find($request);
        $procesverbal->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getProcesverbalEMCommuneById( $request){
        $procesverbal= Procesverbauxexecutionmarche::find($request);
        return $procesverbal; 
    }

    public function getProcesverbauxexecutionmarches(Request $request){
        $procesverbal= Procesverbauxexecutionmarche::all();
        return $procesverbal;
    }
}
