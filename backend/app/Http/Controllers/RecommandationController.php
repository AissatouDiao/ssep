<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recommandation;

use App\Http\Requests\RecommandationRequest;

class RecommandationController extends Controller
{
    public function add(RecommandationRequest $request){

    Recommandation::create($request->all());
    return response()->json(["message"=>"une nouvelle recommandation a été crée."]);
       
    }

    public function delete($request){
        $recommandation= Recommandation::find($request);
        $recommandation->delete();
        return response()->json(["message" => "suppression recommandation effective!"]); 
        
    }

    public function update(RecommandationRequest $request){
        $recommandation = Recommandation::find($request->id);
       
        $recommandation->titre=$request->titre;
        $recommandation->description=$request->description;
        $recommandation->responsable=$request->responsable;
        $recommandation->date_finale=$request->date_finale;
        $recommandation->statut=$request->statut; 
        $recommandation->pourcentage=$request->pourcentage;

        $recommandation->save();

        return response()->json([
            "message"=>"La recommandation a été mise à jour !",
                "error"=>"La recommandation n'a pu être mise à jour, veuillez revoir les données remplies."
        ]); 
        
    }
 

    public function getRecommandations(){
        $recommandations= Recommandation::all();
        return $recommandations;
    }

    public function getRecommandationsByEvaluationId(Request $request){
        $recommandations=Recommandation::where('evaluation_id',$request->id)->get();
        return $recommandations;

    }

    public function changeStatut( Request $request){
        $recommandation=Recommandation::find($request->id);
        $recommandation->statut=$request->statut;
        $recommandation->save();
        return response()->json([
            "message" => "recommandation mis à jour",
            
        ]); 
    }
}

