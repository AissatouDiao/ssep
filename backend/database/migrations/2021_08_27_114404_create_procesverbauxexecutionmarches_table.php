<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProcesverbauxexecutionmarchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('procesverbauxexecutionmarches', function (Blueprint $table) {
            $table->id();
            $table->string('libelle')->unique();
            $table->foreignId('commune_id')
            ->constrained('communes')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->string('procesverbal')->unique();
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
        Schema::dropIfExists('procesverbauxexecutionmarches');
    }
}
