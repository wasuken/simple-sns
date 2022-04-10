<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id');
            $table
                ->foreign('post_id')
                ->references('id')
                ->on('user_posts')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE');

            $table->foreignId('user_id');
            $table
                ->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE');

            $table->text('content');

            $table->foreignId('parent_comment_id')->nullable();
            $table
                ->foreign('parent_comment_id')
                ->references('id')
                ->on('user_comments');
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
        Schema::dropIfExists('user_comments');
    }
};
