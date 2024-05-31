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
        Schema::create('sponsor_contract', function (Blueprint $table) {
            $table->id();
            $table->date('signing_date');
            $table->string('contract_number'); 
            $table->unsignedBigInteger('sponsor_id'); 
            $table->enum('classification', ['cash', 'goods']); 
            $table->text('details');
            $table->decimal('value', 15, 2); 
            $table->string('sponsorship_duration'); 
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
        Schema::dropIfExists('sponsor_contract');
    }
};
