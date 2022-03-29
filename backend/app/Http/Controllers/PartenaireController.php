<?php

namespace App\Http\Controllers;

use App\Models\Partenaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Sousactivitepartenaire;
use App\Http\Requests\PartenaireRequest;

class PartenaireController extends Controller
{
    
    public function getPartenaires(Request $request){

        $partenaires= Partenaire::all();
        foreach($partenaires as $p){
            $this->calculApportFinancierGlobal($p);

        }
        return $partenaires;
    }

    public function deletePartenaire( $request){
        $partenaire= Partenaire::find($request);
        $partenaire->delete();
        return response()->json(["data" => "suppression effective!"]); 
      
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

    public function calculApportFinancierGlobal($objet){
       $somme_total= Sousactivitepartenaire::where('partenaire_id',$objet->id)->sum('budget');
       $Partenaire=Partenaire::find($objet->id);
       $Partenaire->apport_financier_total= $somme_total;
       $Partenaire->save();

    }

    public function getPourcentages(Request $request){

        $thepourcentages = DB::table('ptbapartenaires')
       ->where('partenaire_id',$request->id)
       ->join('ptbas', 'ptbas.id', '=', 'ptbapartenaires.ptba_id')
       ->select('ptbas.libelle', 'ptbapartenaires.budget')
       ->get();
       return $thepourcentages;
    }

    public function getNumberPartenaires(){
        $partenairesnombre= Partenaire::all()->count();
        return $partenairesnombre;
    }

}
