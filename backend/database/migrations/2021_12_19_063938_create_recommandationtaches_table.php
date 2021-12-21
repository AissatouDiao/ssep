<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecommandationtachesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recommandationtaches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('recommandation_id')
            ->constrained('recommandations')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('tache');
            $table->string('etat');
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
        Schema::dropIfExists('recommandationtaches');
    }
}
