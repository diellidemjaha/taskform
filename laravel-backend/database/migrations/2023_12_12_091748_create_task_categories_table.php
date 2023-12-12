<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskCategoriesTable extends Migration
{
    public function up()
    {
        Schema::create('task_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('tasks_category_id');
            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->foreign('tasks_category_id')->references('id')->on('tasks_categories')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('task_categories');
    }
}
