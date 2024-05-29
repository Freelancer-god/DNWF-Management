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
        Schema::create('sponsors', function (Blueprint $table) {
            $table->id();
            $table->enum('sponsor_type', ['individual', 'organization']); // Only allow values 'individual' or 'organization' for sponsor type
            $table->enum('method', ['money', 'in_kind'])->nullable(); // Only allow values 'money' or 'in_kind' for method
            $table->string('name')->nullable();
            $table->string('field_of_activity', 50);
            $table->string('representative');
            $table->date('representative_date_of_birth')->nullable();
            $table->string('representative_phone');
            $table->string('zalo')->nullable();
            $table->string('person_in_charge');
            $table->string('person_in_charge_phone');
            $table->string('zalo_person_in_charge')->nullable();
            $table->text('sponsor_address')->nullable();
            $table->string('website')->nullable();
            $table->string('email', 30)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sponsors');
    }
};
