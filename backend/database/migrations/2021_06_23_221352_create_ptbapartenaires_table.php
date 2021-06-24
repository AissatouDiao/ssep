<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePtbapartenairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ptbapartenaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ptba_id')
            ->constrained('ptbas')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('partenaire_id')
            ->constrained('partenaires')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->double('budget')->unsigned();
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
        Schema::dropIfExists('ptbapartenaires');
    }
}
