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
        Schema::create('official_documents', function (Blueprint $table) {
            $table->id();
            $table->string('document_number');
            $table->date('issue_date');
            $table->string('issued_by');
            $table->integer('document_type');
            $table->integer('status');
            $table->string('summary');
            $table->string('signed_by');
            $table->string('recipient');
            $table->integer('attachment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('official_documents');
    }
};
