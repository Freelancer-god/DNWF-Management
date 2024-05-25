<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id('id');
            $table->string('reference', 20)->unique();
            $table->string('phone', 20)->nullable()->index();
            $table->string('name')->nullable();
            $table->string('username')->nullable();
            $table->string('password', 100)->nullable();
            $table->string('sex', 10)->nullable();
            $table->string('email')->nullable()->unique();
            $table->text('notes')->nullable();
            $table->text('description')->nullable();
            $table->date('birth_date')->nullable()->index();
            $table->dateTime('last_login_at')->nullable()->index();
            $table->tinyInteger('status')->default(1)->index();
            $table->tinyInteger('type')->default(1);
            $table->text('medias')->nullable();
            $table->uuid('uuid')->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->index('created_at');
            $table->index('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
