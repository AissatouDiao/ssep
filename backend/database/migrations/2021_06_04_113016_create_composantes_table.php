<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComposantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('composantes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ptba_id')
            ->constrained('ptbas')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('libelle');
            $table->double('budget')->unsigned()->nullable();
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
        Schema::dropIfExists('composantes');
    }
}
