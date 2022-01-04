<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgreagequalitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agreagequalites', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->string('departement');
            $table->string('commune');
            $table->string('village');
            $table->unsignedInteger('annee');
            $table->string('nom_organisation_ou_producteur');
            $table->string('produit');
            $table->date('date_controle');
            $table->unsignedInteger('nombre_sacs_lot');
            $table->unsignedInteger('poids_moyen_sac');
            $table->unsignedDecimal('taux_humidite');
            $table->unsignedDecimal('taux_impurete');
            $table->unsignedDecimal('grains_immatures_taux');
            $table->string('conforme_code_qualite');
            $table->string('observations');
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
        Schema::dropIfExists('agreagequalites');
    }
}
