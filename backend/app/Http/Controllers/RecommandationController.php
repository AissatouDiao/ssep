<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Recommandation;
use App\Models\Recommandationtache;
use App\Http\Requests\RecommandationRequest;
use App\Notifications\Responsable_recommandation;

class RecommandationController extends Controller
{
    public function add(RecommandationRequest $request){
    Recommandation::create($request->all());
    $lastRecordDate = Recommandation::latest()->first();
    User::find($request->userresponsable_id)->notify(new Responsable_recommandation($lastRecordDate)); 
    return response()->json(["message"=>"une nouvelle recommandation a été crée."]);
       
    }

    public function getusersnotifications($request){
        DB::table('notifications')->get();
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
        $recommandation->date_debut=$request->date_debut;
        $recommandation->userresponsable_id=$request->userresponsable_id;

        $recommandation->save();

        return response()->json([
            "message"=>"La recommandation a été mise à jour !",
                "error"=>"La recommandation n'a pu être mise à jour, veuillez revoir les données remplies."
        ]); 
        
    }
 

    public function getRecommandations(){
        $recommandations= Recommandation::all();
        foreach($recommandations as $r){
          $this->changeStatut($r);
        }
        return $recommandations;
    }

    public function getRecommandationsByEvaluationId(Request $request){
        $recommandations=Recommandation::where('evaluation_id',$request->id)->get();
        foreach($recommandations as $r){
        $this->changeStatut($r);
        
        }
        return $recommandations;

    }

    public function changeStatut($request){
        $recommandation=Recommandation::find($request->id);
        $date_actuelle= Carbon::now();
        $date_finale=$recommandation->date_finale;
        $date_debut=$recommandation->date_debut;
        //si pourcentage egal 100 et date actuel inferieur date finale
        //si pourcentage egal moins de 100 et date actuel superieur date final.
        if($recommandation->pourcentage==100){
            $recommandation->statut="exécutée";
            $recommandation->save();
        }else if($recommandation->pourcentage<100 && $date_actuelle->greaterThan($date_finale)){
            $recommandation->statut="non exécutée";
            $recommandation->save();
        }
        else if(($recommandation->pourcentage>0 && $recommandation->pourcentage<100)&&($date_actuelle->lessThan($date_debut))){
            $recommandation->statut="dûe et en cours";
            $recommandation->save();
        }else{
            $recommandation->statut="non dûe";
            $recommandation->save();
          
        }
        //return  $date_finale;
       
     /* return response()->json([
            "message" => $date_actuelle,
            "message 1"=>$date_finale,
            "message 2"=>$date_actuelle->greaterThan($date_finale)
        ]); */

       // $taches=Recommandationtache::where('recommandation_id',$request->id)->get();
    }

  
}

