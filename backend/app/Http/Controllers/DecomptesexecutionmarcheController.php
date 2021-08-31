<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Decomptesexecutionmarche;

class DecomptesexecutionmarcheController extends Controller
{
    public function add(Request $request){

        $document = $request->file('decompte');
        $path;
        if($document){
            $repertoire='./documents/communes/executionmarche/decomptes';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Decomptesexecutionmarche::create([
                "libelle"=>$request->libelle,
                "decompte"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Decomptesexecutionmarche::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    
    public function update(Request $request){
        $document = $request->file('decompte');
        
        $decompte=Decomptesexecutionmarche::find($request->id);
        
        if($decompte->decompte!=$request->decompte)
        { 
            File::delete($decompte->decompte);
            $path;
             if($document){
             $repertoire='./documents/communes/executionmarche/decomptes';
             $extension=$document->getClientOriginalExtension();
             do {
                 $nom = time() . '.' . $extension;
             } while(file_exists( $repertoire . '/' . $nom));
             $document->move( $repertoire, $nom);
             $path=$repertoire.'/'.$nom;
            
     
             $decompte->libelle=$request->libelle;
             $decompte->commune_id=$request->commune_id;
             $decompte->decompte=$path;
 
            $decompte->save();
 
             return response()->json([
                 "message"=>"La decompte a été mis à jour avec succès  !",
                  "error"=>"La decompte n'a pu être mise à jour, veuillez revoir les données remplies."
             ]); }
        }
 
        $decompte->libelle=$request->libelle;
        $decompte->commune_id=$request->commune_id;
        $decompte->decompte=$request->decompte;
        
        $decompte->save();
        return response()->json([
            "message"=>"La decompte mis à jour avec succès !",
             "error"=>"La decompte n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    public function delete( $request){
        $decompte= Decomptesexecutionmarche::find($request);
        $decompte->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getDecompteEMCommuneById( $request){
        $decompte= Decomptesexecutionmarche::find($request);
        return $decompte; 
    }

    public function getDecomptesexecutionmarches(Request $request){
        $decompte= Decomptesexecutionmarche::all();
        return $decompte;
    }
}
