<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganisationsaccompagneesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organisationsaccompagnees', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->string('departement');
            $table->string('commune');
            $table->string('nom_organisation');
            $table->string('statut_organisation');
            $table->string('prenom_et_nom_responsable');
            $table->string('contact_responsable');
            $table->integer('nombre_membre_organisation');
            $table->integer('nombre_femmes');
            $table->integer('nombre_hommes');
            $table->string('activites_principales');
            $table->double('montant_credit_recu');
            $table->string('source_financement');
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
        Schema::dropIfExists('organisationsaccompagnees');
    }
}
