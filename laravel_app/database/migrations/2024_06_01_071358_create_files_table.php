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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('file_name')->nullable();
            $table->text('file_path')->nullable();
            $table->string('file_type', 50)->nullable();
            $table->integer('type')->nullable();
            $table->integer('status')->nullable();
            $table->string('fileable_id')->nullable();
            $table->string('fileable_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
