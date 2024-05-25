<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Permission;
use App\Models\Role;
use App\Repositories\EmployeeRepository;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreateDefaultPermission extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->permission_v1();
//        $this->permission_v2();
    }

    public function permission_v2() {
        try {
            DB::beginTransaction();
            $updateDriverAgencyPerm = Permission::create([ 'name' => 'update-driver-agency', 'display_name' => 'Update driver agency', 'type' => 6]);
//            $permissions = Permission::all();
            $super = Role::where('name', 'superadmin')->first();
            if(isset($super)) {
                $super->givePermission($updateDriverAgencyPerm);
            }
            $admin = Role::where('name', 'admin')->first();
            if(isset($admin)) {
                $admin->givePermission($updateDriverAgencyPerm);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }

    public function permission_v1() {
        try {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            DB::table('employees')->truncate();
            DB::table('roles')->truncate();
            DB::table('role_user')->truncate();
            DB::table('permissions')->truncate();
            DB::table('permission_role')->truncate();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');

            $repo_employee = new EmployeeRepository();
            DB::beginTransaction();
            $viewEmployeePerm = Permission::create([ 'name' => 'view-employee', 'display_name' => 'View employee', 'type' => 1]);
            $createEmployeePerm = Permission::create([ 'name' => 'create-employee', 'display_name' => 'Create employee', 'type' => 1]);
            $updateEmployeePerm = Permission::create([ 'name' => 'update-employee', 'display_name' => 'Update employee', 'type' => 1]);
            $deleteEmployeePerm = Permission::create([ 'name' => 'delete-employee', 'display_name' => 'Delete employee', 'type' => 1]);
            $exportEmployeePerm = Permission::create([ 'name' => 'export-employee', 'display_name' => 'Export employee', 'type' => 1]);

            $viewRolePerm = Permission::create([ 'name' => 'view-role', 'display_name' => 'View role', 'type' => 2]);
            $createRolePerm = Permission::create([ 'name' => 'create-role', 'display_name' => 'Create role', 'type' => 2]);
            $updateRolePerm = Permission::create([ 'name' => 'update-role', 'display_name' => 'Update role', 'type' => 2]);
            $deleteRolePerm = Permission::create([ 'name' => 'delete-role', 'display_name' => 'Delete role', 'type' => 2]);

            $super = Role::where('name', 'superadmin')->first();
            if(!isset($super)) {
                $super = Role::create([
                    'name' => 'superadmin',
                    'display_name' => 'Super admin',
                    'type' => Role::TYPE_SUPER_ADMIN,
                    'status' => Role::STATUS_ACTIVE
                ]);
            }
            if(isset($super)) {
                $super->givePermission($viewEmployeePerm);
                $super->givePermission($createEmployeePerm);
                $super->givePermission($updateEmployeePerm);
                $super->givePermission($deleteEmployeePerm);
                $super->givePermission($exportEmployeePerm);

                $super->givePermission($viewRolePerm);
                $super->givePermission($createRolePerm);
                $super->givePermission($updateRolePerm);
                $super->givePermission($deleteRolePerm);
            }

            $pogofdev = Employee::where('username', 'pogofdev')->first();
            if(!isset($pogofdev)) {
                $pogofdev = Employee::create([
                    'name' => 'Admin',
                    'reference' => $repo_employee->getReference(),
                    'username' => 'admin',
                    'email' => 'admin@admin.com',
                    'password' => bcrypt('admin123'),
                    'type' => Employee::TYPE_SUPER_ADMIN,
                    'uuid' => (string) Str::orderedUuid()
                ]);
            }
            $pogofdev->roles()->save($super);
            DB::commit();
        }
        catch (\Exception $e) {
            DB::rollBack();
            echo $e->getMessage();
        }
    }

    private function updatePermissionByRole($allPerms, $roleName) {
        $role = Role::where('name', $roleName)->first();
        if(isset($role)) {
            $role->permissions()->detach();
            $permission_ids = [];
            foreach($allPerms as $per) {
                array_push($permission_ids, $per->id);
            }
            if(count($permission_ids) > 0){
                $role->syncPermissions($permission_ids);
            }
        }
    }
}
