<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSousactivitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sousactivites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activite_id')
            ->constrained('activites')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('libelle');
            $table->double('budget')->unsigned();
            $table->string('etat');
            $table->double('cout_estimatif')->unsigned();
            $table->double('cout_reel')->unsigned();
            $table->date('debut_reel');
            $table->date('fin_reel');
            $table->date('debut_planifie');
            $table->date('fin_planifie');
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
        Schema::dropIfExists('sousactivites');
    }
}
