<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrealableszonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prealableszones', function (Blueprint $table) {
            $table->id();
            $table->string('libelle')->unique();
            $table->foreignId('zone_id')
            ->constrained('zones')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('prealable')->unique();
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
        Schema::dropIfExists('prealableszones');
    }
}
