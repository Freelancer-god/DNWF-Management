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
        Schema::create('employee_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employee_id')->index();
            $table->string('reference', 15)->index();
            $table->string('employee_name')->nullable();
            $table->string('employee_phone', 20)->nullable();
            $table->string('employee_reference', 30)->index();
            $table->string('action', 30)->index();
            $table->tinyInteger('action_type')->default(0)->index();
            $table->text('content')->nullable();
            $table->text('request_data')->nullable();
            $table->text('response_data')->nullable();
            $table->unsignedBigInteger('log_id')->nullable()->index();
            $table->string('log_type', 30)->nullable()->index();
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
        Schema::dropIfExists('employee_logs');
    }
};
