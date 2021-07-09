<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoissousactivitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('moissousactivites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sousactivite_id')
            ->constrained('sousactivites')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('mois_id')
            ->constrained('mois')
            ->onUpdate('cascade')
            ->onDelete('cascade');
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
        Schema::dropIfExists('moissousactivites');
    }
}
