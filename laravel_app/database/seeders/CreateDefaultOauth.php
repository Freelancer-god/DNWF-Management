<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreateDefaultOauth extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            DB::unprepared("
                INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
                ('9a8fb645-4e49-4890-969e-4f40c0af8555', NULL, 'Cudidi Passenger Personal Access Client', '9r1FKrOhACIvuBDibAdhkQk6x4aCwPhN2MpbBxEa', NULL, 'http://localhost', 1, 0, 0, '2023-11-08 05:11:29', '2023-11-08 05:11:29'),
                ('9a8fb647-faba-49c6-8bd5-3773aa8a1dd5', NULL, 'Cudidi Passenger Password Grant Client', 'D7bxzMIcHkyEzkwvT5wuHlG0PHd4UE1jcySU4ghT', 'passengers', 'http://localhost', 0, 1, 0, '2023-11-08 05:11:31', '2023-11-08 05:11:31');


                INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
                (1, '9a8fb645-4e49-4890-969e-4f40c0af8555', '2023-11-08 05:11:29', '2023-11-08 05:11:29');
            ");
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }
}
