<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateValeurannuellesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('valeurannuelles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('indicateur_id')
            ->constrained('indicateurs')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->integer('annee');
            $table->integer('valeur');
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
        Schema::dropIfExists('valeurannuelles');
    }
}
