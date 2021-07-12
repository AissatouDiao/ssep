<?php

namespace App\Http\Controllers;

use App\Models\Moi;
use App\Models\Sousactivite;
use Illuminate\Http\Request;
use App\Models\Moissousactivite;
use Illuminate\Support\Facades\DB;
use App\Models\Sousactivitepartenaire;

class SousactiviteController extends Controller
{
    public function add(Request $request){
        Sousactivite::create($request->all());
        $lastRecordDate = Sousactivite::latest()->first();
        return response()->json([
            "message"=>"Une nouvelle sous-activité a été ajouté !",
            "last"=>$lastRecordDate,
        ]);
    }

    public function addPartenaireFinanciersSousactivite(Request $request){
        Sousactivitepartenaire::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire financier a été ajouté !",
        ]);
    }

    public function addMoisSousactivite(Request $request){
        Moissousactivite::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire financier a été ajouté !",
        ]);
    }


    
    public function update(Request $request){

        $sousactivite=Sousactivite::find($request->id);
        $sousactivite->activite_id=$request->activite_id;
        $sousactivite->libelle=$request->libelle;
        $sousactivite->etat=$request->etat;
        $sousactivite->cout_estimatif=$request->cout_estimatif;
        $sousactivite->cout_estimatif=$request->cout_reel;
        $sousactivite->debut_planifie=$request->debut_planifie;
        $sousactivite->fin_planifie=$request->fin_planifie;
        $sousactivite->debut_reel=$request->debut_reel;
        $sousactivite->fin_reel=$request->fin_reel;
        $sousactivite->save();
        return response()->json([
            "message"=>"sous-activité mis à jour !"
        ]);

    }
    
    public function delete($request){
        $sousactivite= Sousactivite::find($request);
        $sousactivite->delete();
        return response()->json(["message" => "suppression sous-activité effective !"]); 
        
    }

    public function deletePartenaire($request){
        $sousactivite= Sousactivitepartenaire::find($request);
        $sousactivite->delete();
        return response()->json(["message" => "suppression partenaire sous-activité effective !"]); 
        
    }

    public function deletemoisousactivite($request){
        $sousactivite= Moissousactivite::find($request);
        $sousactivite->delete();
        return response()->json(["message" => "suppression sous-activité mois effective !"]); 
        
    }
    public function getpartenaires_sa(){
        $sousactivitespartenaires=Sousactivitepartenaire::all();
        return $sousactivitespartenaires;
    }

    public function getAll(){
        $sousactivites=Sousactivite::all();
        foreach($sousactivites as $sa){
            $this->getsousactivitebudgettotal($sa);
        }
        return $sousactivites;
    }
    public function getsousactivitebudgettotal($objet){
        $budget_sa= DB::table('sousactivitepartenaires')->where('sousactivite_id',$objet->id)->get()->sum('budget');
        $sa= Sousactivite::find($objet->id);
        $sa->cout_estimatif= $budget_sa;$sa->save();
        return $budget_sa;
       }

    public function getMois(){
        $mois=Moi::all();
        return $mois;
    }
    public function getMoisSousActivites(){
        $moisactivite=Moissousactivite::all();
        return $moisactivite;
    }
}
