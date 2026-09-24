<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Define Roles
        $adminRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin']);
        $petugasRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'petugas']);

        // Create Default Admin User
        $admin = User::firstOrCreate([
            'email' => 'admin@gerbangcek.com',
        ], [
            'name' => 'Super Admin',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);
        
        $admin->assignRole($adminRole);
    }
}
