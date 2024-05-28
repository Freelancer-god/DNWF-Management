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
        Schema::create('clubs', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 10)->nullable();
            $table->string('name')->nullable();
            $table->date('founding_date')->nullable();
            $table->string('leader_name')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('phone_zalo', 15)->nullable();
            $table->text('media')->nullable();
            $table->integer('status')->nullable();
            $table->integer('type')->nullable();
            $table->integer('confirm_status')->nullable();
            $table->string('confirm_date')->nullable();
            $table->string('confirm_user_id')->nullable();
            $table->string('confirm_user_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clubs');
    }
};
