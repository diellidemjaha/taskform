<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('tasks_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->foreign('tasks_category_id')->references('id')->on('tasks_categories')->onDelete('cascade');
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('tasks_categories');
    }
}