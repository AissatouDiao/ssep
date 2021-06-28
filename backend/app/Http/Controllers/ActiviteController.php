<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;
use App\Models\Activitepartenaireassocie;
use App\Models\Activitepartenairefinancier;
use App\Models\Activitepartenairesponsable;

class ActiviteController extends Controller
{
    public function add(Request $request){
        Activite::create($request->all());
        $lastRecordDate = Activite::latest()->first();
        return response()->json([
            "message"=>"Un nouveau activite a été ajouté !",
             "last"=>$lastRecordDate,
        ]);
    }

    public function addPartenairesAssocies(Request $request){
        Activitepartenaireassocie::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire associé a été ajouté !",
        ]);
    }

    public function addPartenaireFinanciers(Request $request){
        Activitepartenairefinancier::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire financier a été ajouté !",
        ]);
    }

    public function addPartenairesponsables(Request $request){
        Activitepartenairesponsable::create($request->all());
        return response()->json([
            "message"=>"Un nouveau partenaire responsable a été ajouté !",
        ]);
    }


    
    public function update(Request $request){

        $activite=Activite::find($request->id);
        $activite->composante_id=$request->composante_id;
        $activite->libelle=$request->libelle;
        $activite->extrant=$request->extrant;
        $activite->budget=$request->budget;
        $activite->etat=$request->etat;
        $activite->pourcentage=$request->pourcentage;
        $activite->save();
        return response()->json([
            "message"=>"Activite mis à jour !"
        ]);

    }
    
    public function delete($request){
        $activite= Activite::find($request);
        $activite->delete();
        return response()->json(["message" => "suppression activite effective!"]); 
        
    }

    public function getAll(){
        $activites=Activite::all();
        return $activites;
    }
}
