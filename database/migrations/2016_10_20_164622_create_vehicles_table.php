<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVehiclesTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('vehicles', function (Blueprint $table) {
      $table->increments('id');
      $table->enum('type', ['semi-truck', 'swap-truck', 'pup-trailer']);
      $table->date('date');
      $table->integer('available')->default(0);
      $table->integer('price')->default(0);

      $table->unique(['type', 'date']);
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
    Schema::dropIfExists('vehicles');
  }
}
