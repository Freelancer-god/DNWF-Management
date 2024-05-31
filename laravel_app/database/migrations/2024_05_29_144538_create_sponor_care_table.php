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
        Schema::create('sponsor_care', function (Blueprint $table) {
            $table->id();
            $table->string('job_type');
            $table->text('job_content');
            $table->string('executor');
            $table->text('notes')->nullable();
            $table->enum('status', ['not_cared', 'cared']);
            $table->unsignedBigInteger('sponsor_id'); // Mã nhà tài trợ
            $table->timestamps();

            // Thiết lập khóa ngoại
            $table->foreign('sponsor_id')->references('id')->on('sponsor')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donors_care');
    }
};
