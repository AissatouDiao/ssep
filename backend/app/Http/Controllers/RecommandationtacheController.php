<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recommandation;
use App\Models\Recommandationtache;

class RecommandationtacheController extends Controller
{
    public function add(Request $request){
        Recommandationtache::create($request->all());
        $lastRecordDate = Recommandationtache::latest()->first();
        return response()->json([
            "message"=>"Une nouvelle tâche a été ajouté à la recommadation!",
             "last"=>$lastRecordDate,
        ]);
    }
    public function update(Request $request){
        $Recommandationtache=Recommandationtache::find($request->id);
        $Recommandationtache->recommandation_id=$request->recommandation_id;
        $Recommandationtache->tache=$request->tache;
        $Recommandationtache->etat=$request->etat;
        $Recommandationtache->save();
        $this->pourcentage($request->recommandation_id);
       return response()->json([
           "message"=>"La tâche mise à jour avec succès !",
            "Recommandationtache"=>$Recommandationtache
       ]);
    }
    public function delete( $request){
        $tache= Recommandationtache::find($request);
        $tache->delete();
        return response()->json(["data" => "suppression effective!"]);
    }

    public function getRecommandationtacheById( $request){
        $tache= Recommandationtache::find($request);
        return $tache; 
    }

    public function getRecommandationtaches(Request $request){
        $taches= Recommandationtache::all();
        return $taches;
    }

    Public function pourcentage($request){
        $total_taches=  Recommandationtache::where('recommandation_id',$request)->get()->count();
        $total_achevées=Recommandationtache::where(['recommandation_id'=>$request,'etat'=>'fait'])->get()->count();
        $pourcentage=$total_achevées*100/$total_taches;
        $recommandation = Recommandation::find($request);
        $recommandation->pourcentage=$pourcentage;
        $recommandation->save();
        return $pourcentage;
    }
}
