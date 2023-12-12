<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // $adminRole = Role::create(['name' => 'admin']);
        // $userRole = Role::create(['name' => 'user']);
    
        // $permissions = [
        //     'create tasks',
        //     'read tasks',
        //     'update tasks',
        //     'delete tasks',
        // ];
    
        // foreach ($permissions as $permission) {
        //     Permission::create(['name' => $permission]);
        //     $adminRole->givePermissionTo($permission);
        // }
    
        // $userRole->givePermissionTo('read tasks');
    }
}
