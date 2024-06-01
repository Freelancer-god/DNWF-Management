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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 15)->nullable();
            $table->string('full_name')->nullable();
            $table->integer('gender')->nullable();
            $table->dateTime('birthday')->nullable();
            $table->string('phone',15)->nullable();
            $table->integer('citizen_identify')->nullable();
            $table->dateTime('citizen_identify_date')->nullable();
            $table->string('citizen_identify_place')->nullable();
            $table->string('position')->nullable();
            $table->string('address')->nullable();
            $table->string('academic_level')->nullable();
            $table->boolean('is_partisan')->nullable();
            $table->string('profession')->nullable();
            $table->string('work_place')->nullable();
            $table->integer('organization_id')->nullable();
            $table->integer('club_id')->nullable();
            $table->date('joining_date')->nullable();
            $table->integer('status')->nullable();
            $table->integer('type')->nullable();
            $table->text('media')->nullable();
            $table->string('role_in_organization')->nullable();
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
        Schema::dropIfExists('members');
    }
};
