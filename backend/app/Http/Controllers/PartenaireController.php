<?php

namespace App\Http\Controllers;

use App\Models\Partenaire;
use Illuminate\Http\Request;
use App\Http\Requests\PartenaireRequest;

class PartenaireController extends Controller
{
    
    public function getPartenaires(Request $request){

        $partnaires= Partenaire::all();
        return $partnaires= Partenaire::all();
    }

    public function deletePartenaire( $request){
        $partenaire= Partenaire::find($request);
        $partenaire->delete();
        return response()->json(["data" => "suppression efective!"]); 
      
    }

    public function ajouterPartenaire(PartenaireRequest $request){
        Partenaire::create($request->all());
     
        return response()->json([
            "message"=>"Un nouveau partenaire a été ajouté !",
        ]);
    }

    public function updatePartenaire(PartenaireRequest $request){
        $Partenaire=Partenaire::find($request->id);
        $Partenaire->libelle=$request->libelle;
        $Partenaire->type=$request->type;
        $Partenaire->apport_financier_total=$request->apport_financier_total;
        $Partenaire->save();
       return response()->json([
           "message"=>"Partenaire mis à jour avec succès !",
            "Partenaire"=>$Partenaire
       ]);

    }

    public function updatePartenaireApport($request){
        $Partenaire=Partenaire::find($request->id);
        $Partenaire->apport_financier_total=$request->apport_financier_total;
        $Partenaire->save();
      
    }


}
