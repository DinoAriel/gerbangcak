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

        // Create Default Petugas User
        $petugas = User::firstOrCreate([
            'email' => 'petugas@gerbangcek.com',
        ], [
            'name' => 'Petugas Scan',
            'password' => bcrypt('password'),
            'role' => 'petugas',
        ]);
        
        $petugas->assignRole($petugasRole);

        // Seed data kendaraan dan pengemudi dari Excel
        $this->call([
            KendaraanSeeder::class,
            PengemudiSeeder::class,
        ]);
    }
}
