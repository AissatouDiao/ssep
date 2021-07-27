<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePassationpropositionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('passationpropositions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('passation_id')
            ->constrained('passationmarches')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('libelle')->unique();
            $table->string('passationproposition')->unique();
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
        Schema::dropIfExists('passationpropositions');
    }
}
