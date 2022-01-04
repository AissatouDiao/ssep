<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGeoreferencementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('georeferencements', function (Blueprint $table) {
            $table->id();
            $table->string('region');
            $table->string('departement');
            $table->string('commune');
            $table->string('village');
            $table->string('prenom_nom');
            $table->string('genre');
            $table->string('organisation_base');
            $table->double('superficie_globale');
            $table->double('superficie_mesuree');
            $table->integer('poulaillers');
            $table->integer('bergeries');
            $table->string('equipements');
            $table->double('coordonnee_x');
            $table->double('coordonnee_y');



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
        Schema::dropIfExists('georeferencements');
    }
}
