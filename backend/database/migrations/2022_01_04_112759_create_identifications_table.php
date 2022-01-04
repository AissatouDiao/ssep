<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIdentificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('identifications', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->string('departement');
            $table->string('commune');
            $table->string('village');
            $table->string('genre');
            $table->string('statut_producteur');
            $table->bigInteger('numero_cni');
            $table->unsignedInteger('telephone');
            $table->string('activite');
            $table->string('organisation_de_base');
            $table->string('statut_organisation_de_base');
            $table->unsignedInteger('nombre_organisations_de_base');
            $table->double('superificie_totale_cultivee');
            $table->string('chef_de_menage');
            $table->string('membre_menage_chef_appuye');
            $table->double('quantite_semences_utilisee');
            $table->unsignedInteger('nombre_poules');
            $table->unsignedInteger('nombre_brebis');
            $table->double('montant_credit_recu');
            $table->string('source_financement');
            $table->double('superficie_assuréee');
            $table->double('superficie_totale_recoltee');
            $table->double('production_totale_obtenue');
            $table->double('quantite_commercialisee');
            $table->unsignedInteger('nombre_moutons_produits');
            $table->unsignedInteger('nombre_poussins_produits');
            $table->double('quantite_paddy_transformee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('identifications');
    }
}
