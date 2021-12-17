<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluationsprocedurescommune;

class EvaluationsprocedurescommuneController extends Controller
{
    public function add(Request $request){

        $document = $request->file('evaluation');
        $path;
        if($document){
            $repertoire='./documents/communes/evaluationprocedure';
            $extension =$document->getClientOriginalExtension();
            do {
				$nom = time() . '.' . $extension;
            } while(file_exists( $repertoire . '/' . $nom));
            $document->move( $repertoire, $nom);
            $path=$repertoire.'/'.$nom;
            $evaluation = Evaluationsprocedurescommune::create([
                "libelle"=>$request->libelle,
                "evaluation"=>$path,
                "commune_id"=>$request->commune_id,        
            ]);
            $latest=Evaluationsprocedurescommune::latest()->first();
           return response()->json([
            "message" => "enregistrement du document effectué !",
            "latest"=>$latest]);
        }
    }

    public function update(Request $request){
        $document = $request->file('evaluation');
        
        $evaluation=Evaluationsprocedurescommune::find($request->id);
        
        if($evaluation->evaluation!=$request->evaluation)
        { 
            File::delete($evaluation->evaluation);
            $path;
                if($document){
                $repertoire='./documents/communes/evaluationprocedure';
                $extension=$document->getClientOriginalExtension();
                do {
                    $nom = time() . '.' . $extension;
                } while(file_exists( $repertoire . '/' . $nom));
                $document->move( $repertoire, $nom);
                $path=$repertoire.'/'.$nom;
            
        
                $evaluation->libelle=$request->libelle;
                $evaluation->commune_id=$request->commune_id;
                $evaluation->evaluation=$path;
    
            $evaluation->save();
    
                return response()->json([
                    "message"=>"L'evaluation a été mis à jour avec succès  !",
                    "error"=>"L'evaluation n'a pu être mise à jour, veuillez revoir les données remplies."
                ]); }
        }
    
        $evaluation->libelle=$request->libelle;
        $evaluation->commune_id=$request->commune_id;
        $evaluation->evaluation=$request->evaluation;
        
        $evaluation->save();
        return response()->json([
            "message"=>"L'évaluation mis à jour avec succès !",
                "error"=>"L'évaluation n'a pu être mise à jour, veuillez revoir les données remplies."
        ]);
    }

    public function delete( $request){
        $prealable= Evaluationsprocedurescommune::find($request);
        $prealable->delete();
        return response()->json(["message" => "suppression effective!"]); 
      
    }

    public function getEvaluationCommuneById( $request){
        $prealable= Evaluationsprocedurescommune::find($request);
        return $prealable; 
    }

    public function getEvaluationscommunes(Request $request){
        $prealable= Evaluationsprocedurescommune::all();
        return $prealable;
    }
    
}
