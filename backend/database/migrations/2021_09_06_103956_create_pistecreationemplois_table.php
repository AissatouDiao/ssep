<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePistecreationemploisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pistecreationemplois', function (Blueprint $table) {
            $table->id();
            $table->foreignId('piste_id')
            ->constrained('pistes')
            ->onUpdate('cascade')
            ->onDelete('cascade');    
            $table->foreignId('mois_id')
            ->constrained('mois')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->double('p_creationemploi')->unsigned();
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
        Schema::dropIfExists('pistecreationemplois');
    }
}
