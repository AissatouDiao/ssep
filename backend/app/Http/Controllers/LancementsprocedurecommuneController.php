<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lancementsprocedurecommune;

class LancementsprocedurecommuneController extends Controller
{
    public function add(Request $request){

        $document = $request->file('lancement');
        $path;
        if($document){
            $repertoire='./documents/communes/lancementprocedure';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $lancementprocedure =Lancementsprocedurecommune::create([
                "libelle"=>$request->libelle,
                "lancement"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Lancementsprocedurecommune::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    public function update(Request $request){
        $document = $request->file('lancement');
        
        $lancementprocedure =Lancementsprocedurecommune::find($request->id);
        
        if($lancementprocedure->lancementprocedure!=$request->lancementprocedure)
        { 
            File::delete($lancementprocedure->lancementprocedure);
            $path;
                if($document){
                $repertoire='./documents/communes/lancementprocedure';
                $extension=$document->getClientOriginalExtension();
                do {
                    $nom = time() . '.' . $extension;
                } while(file_exists( $repertoire . '/' . $nom));
                $document->move( $repertoire, $nom);
                $path=$repertoire.'/'.$nom;
            
        
                $lancementprocedure->libelle=$request->libelle;
                $lancementprocedure->commune_id=$request->commune_id;
                $lancementprocedure->lancement=$path;
    
            $lancementprocedure->save();
    
                return response()->json([
                    "message"=>"Le lancementprocedure a été mis à jour avec succès  !",
                    "error"=>"Le lancementprocedure n'a pu être mise à jour, veuillez revoir les données remplies."
                ]); }
        }
    
        $lancementprocedure->libelle=$request->libelle;
        $lancementprocedure->commune_id=$request->commune_id;
        $lancementprocedure->lancement=$request->lancement;
        
        $lancementprocedure->save();
        return response()->json([
            "message"=>"Le lancementprocedure mis à jour avec succès !",
                "error"=>"Le lancementprocedure n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    public function delete( $request){
        $prealable=Lancementsprocedurecommune::find($request);
        $prealable->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getLancementProcedureCommuneById( $request){
        $prealable=Lancementsprocedurecommune::find($request);
        return $prealable; 
    }

    public function getLancementProcedurescommunes(Request $request){
        $prealable=Lancementsprocedurecommune::all();
        return $prealable;
    }
}
