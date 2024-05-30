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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 15)->nullable();
            $table->integer('subject_type')->nullable();
            $table->string('subject_name', 100)->nullable();
            $table->string('name')->nullable();
            $table->string('founding_date')->nullable();
            $table->string('leader_name')->nullable();
            $table->string('phone')->nullable();
            $table->string('phone_zalo')->nullable();
            $table->string('address')->nullable();
            $table->string('activity_time')->nullable();
            $table->string('club_id')->nullable();
            $table->text('media')->nullable();
            $table->string('status')->nullable();
            $table->string('type')->nullable();
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
        Schema::dropIfExists('organizations');
    }
};
