<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Scene;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scenes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('number');
            $table->string('name');
            $table->string ('image')->nullable();
        });

        Scene::insert([
            ["number" => 1, "name" => "Scene 1", "image" => "One"], 
            ["number" => 2, "name" => "Scene 2", "image" => "Two"],
            ["number" => 3, "name" => "Scene 3", "image" => "Three"],
            ["number" => 4, "name" => "Scene 4", "image" => "Four"],
            ["number" => 5, "name" => "Scene 5", "image" => "Five"],
            ["number" => 6, "name" => "Scene 6", "image" => "Six"],
            ["number" => 7, "name" => "Scene 7", "image" => "Seven"],
            ["number" => 8, "name" => "Scene 8", "image" => "Eight"],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scenes');
    }
};
