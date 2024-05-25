<?php

namespace App\Claims;

use App\Models\Employee;
use CorBosman\Passport\AccessToken;

class CustomClaim
{
    public function handle(AccessToken $token, $next)
    {
        $employee = Employee::find($token->getUserIdentifier());
        if(isset($employee)) {
            $token->addClaim('employee_id', $employee->id);
            $token->addClaim('name', $employee->name);
            $token->addClaim('reference', $employee->reference);
            $token->addClaim('type', 'employees');
            $token->addClaim('uuid', $employee->uuid);
        }
        return $next($token);
    }
}
