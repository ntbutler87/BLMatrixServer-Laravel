<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        User::insert([
            ['name' => 'Local Admin', 'email' => 'admin@matrix.local', 'password' => Hash::make('changeme123')],
            ['name' => 'SPTH AV', 'email' => 'av@stpaulsterreyhills.org.au', 'password' => Hash::make('changeme123')],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        User::where('email','admin@matrix.local')->delete();
        User::where('email','av@stpaulsterreyhills.org.au')->delete();
    }
};
