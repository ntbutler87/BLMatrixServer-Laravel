<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Macro;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('macros', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes('deleted_at', precision: 0);
            $table->string ('name');
            $table->integer('slot')->nullable();
            $table->string ('image')->nullable();
            $table->text   ('commands')->nullable();
        });

        Macro::create([
            'name' => '1-1 Mapping',
            'slot' => 1,
            'image' => null,
            'commands' => '#video_d out1 matrix=1#video_d out2 matrix=2#video_d out3 matrix=3#video_d out4 matrix=4#video_d out5 matrix=5#video_d out6 matrix=6#video_d out7 matrix=7#video_d out8 matrix=8'
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('macros');
    }
};
