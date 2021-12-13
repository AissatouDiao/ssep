<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganisationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organisations', function (Blueprint $table) {
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
            $table->string('activités_principales');
            $table->double('montant_credit_recu');
            $table->double('source_financement');
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
        Schema::dropIfExists('organisations');
    }
}
