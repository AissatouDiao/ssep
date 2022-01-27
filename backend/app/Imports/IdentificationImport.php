<?php

namespace App\Imports;

use App\Models\Identification;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\ToCollection;

class IdentificationImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $the_identification=[
            'region'=>$row['Region'],
            'departement'=>$row['Departement'],
            'commune'=>$row['Commune'],
            'village'=>$row['Nom organisation'],
            'prenom_nom'=>$row['Statut Organisation'],
            'genre'=>$row['Prenom et nom responsable'],
            'statut_producteur'=>$row['Contact responsable'],
            'numero_cni'=>$row['Nombre de membres de organisation'],
            'telephone'=>$row['Nombre de membres Femmes'],
            'activite'=>$row['Nombre de membres Hommes'],
            'organisation_de_base'=>$row['Activités principales'],
            'statut_organisation_de_base'=>$row['MONTANT DE CREDIT RECU'],
            'nombre_organisations_de_base'=>$row['nombre_organisations_de_base'],
            'superificie_totale_cultivee'=>$row['SOURCE DE FINANCEMENT'],
            'chef_de_menage'=>$row['SOURCE DE FINANCEMENT'],
            'membre_menage_chef_appuye'=>$row['SOURCE DE FINANCEMENT'],
            'quantite_semences_utilisee'=>$row['SOURCE DE FINANCEMENT'],
            'nombre_poules'=>$row['SOURCE DE FINANCEMENT'],
            'nombre_brebis'=>$row['SOURCE DE FINANCEMENT'],
            'montant_credit_recu'=>$row['SOURCE DE FINANCEMENT'],
            'source_financement'=>$row['SOURCE DE FINANCEMENT'],
            'superficie_assuréee'=>$row['SOURCE DE FINANCEMENT'],
            'superficie_totale_recoltee'=>$row['SOURCE DE FINANCEMENT'],
            'production_totale_obtenue'=>$row['SOURCE DE FINANCEMENT'],
            'quantite_commercialisee'=>$row['SOURCE DE FINANCEMENT'],
            'nombre_moutons_produits'=>$row['SOURCE DE FINANCEMENT'],
            'nombre_poussins_produits'=>$row['SOURCE DE FINANCEMENT'],
            'quantite_paddy_transformee'=>$row['SOURCE DE FINANCEMENT'],
            'nombre_moutons_produits'=>$row['SOURCE DE FINANCEMENT'],
           
        ];
        $identification= Organisation::where([
            'region'=>$the_identification['region'],
            'departement'=>$the_identification['departement'],
            'commune'=>$the_identification['commune'],
            'village'=>$the_identification['nom_organisation'],
            'prenom_nom'=>$the_identification['prenom_nom'],
            'genre'=>$the_identification['genre'],
            'statut_producteur'=>$the_identification['statut_producteur'],
            'numero_cni'=>$the_identification['numero_cni'],
            'telephone'=>$the_identification['telephone'],
            'activite'=>$the_identification['activite'],
            'organisation_de_base'=>$the_identification['organisation_de_base'],
            'statut_organisation_de_base'=>$the_identification['statut_organisation_de_base'],
            'nombre_organisations_de_base'=>$the_identification['nombre_organisations_de_base'],
            'superificie_totale_cultivee'=>$row['SOURCE DE FINANCEMENT'],
            'chef_de_menage'=>$row['chef_de_menage'],
            'membre_menage_chef_appuye'=>$row['membre_menage_chef_appuye'],
            'quantite_semences_utilisee'=>$row['quantite_semences_utilisee'],
            'nombre_poules'=>$row['nombre_poules'],
            'nombre_brebis'=>$row['nombre_brebis'],
            'montant_credit_recu'=>$row['montant_credit_recu'],
            'source_financement'=>$row['source_financement'],
            'superficie_assuréee'=>$row['superficie_assuréee'],
            'superficie_totale_recoltee'=>$row['superficie_totale_recoltee'],
            'production_totale_obtenue'=>$row['production_totale_obtenue'],
            'quantite_commercialisee'=>$row['quantite_commercialisee'],
            'nombre_moutons_produits'=>$row['nombre_moutons_produits'],
            'nombre_poussins_produits'=>$row['nombre_poussins_produits'],
            'quantite_paddy_transformee'=>$row['quantite_paddy_transformee'],
            'nombre_moutons_produits'=>$row['nombre_moutons_produits'],
            ])->first();
        if( $identification===null){
            return  new Identification($the_identification);  
        }else {
            return null;
        }
    }
}
