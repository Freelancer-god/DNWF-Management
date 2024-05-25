<?php

namespace App\Providers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceRepository extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->binding_repository(config('repository.provider'));
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }

    private function binding_repository($repo)
    {
        $files = File::files(app_path($repo['path']));
        foreach ($files as $file) {
            $name = basename($file, '.php');
            $this->app->bind($repo['app'] . '\\' . $repo['contract'] . '\\' . $this->processContractName($name, $repo['contract']),
                $repo['app'] . '\\' . $name);
        }
    }

    private function processContractName($name, $contract) {
        return $name . substr($contract, 0, (strlen($contract) - 1));
    }
}
