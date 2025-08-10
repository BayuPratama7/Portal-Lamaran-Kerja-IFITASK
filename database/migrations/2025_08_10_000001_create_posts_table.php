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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->string('job_type')->default('Full Time'); // Full Time, Part Time, Contract, Internship
            $table->string('salary_range')->nullable();
            $table->text('description');
            $table->text('requirements');
            $table->text('benefits')->nullable();
            $table->string('contact_email');
            $table->string('contact_phone')->nullable();
            $table->date('deadline');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
