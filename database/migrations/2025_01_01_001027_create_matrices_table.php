<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Matrix;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matrices', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->ipAddress('ip');
            $table->integer('port');
            $table->boolean('selected')->unique()->nullable();
        });

        Matrix::insert([
            [ 'ip' => '192.168.8.97',  'port' => 80   , 'selected' => null],
            [ 'ip' => '192.168.8.198', 'port' => 3000 , 'selected' => null],
            [ 'ip' => '127.0.0.1',     'port' => 3000 , 'selected' => null],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matrices');
    }
};
