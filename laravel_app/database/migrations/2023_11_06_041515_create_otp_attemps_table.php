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
        Schema::create('otp_attemps', function (Blueprint $table) {
            $table->id('id');
            $table->string('phone', 20)->index();
            $table->string('password', 50)->nullable();
            $table->string('name')->nullable();
            $table->string('otp', 10)->index();
            $table->boolean('is_confirm')->default(false);
            $table->tinyInteger('type')->default(1);
            $table->tinyInteger('status')->default(0);
            $table->integer('valid_in')->default(0);
            $table->tinyInteger('attempts')->default(0);
            $table->string('device_id', 50)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otp_attemps');
    }
};
