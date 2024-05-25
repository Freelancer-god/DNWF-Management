<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->renderable(function (\Exception $e, Request $request) {
            if (request()->hasHeader('Authorization')) {
                return response()->json([
                    'success' => false,
                    'error' => sprintf(config('error_code')['401'],''),
                    'code' => '401'
                ], 401);
            }
        });
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->hasHeader('Authorization')) {
            return response()->json([
                'success' => false,
                'error' => sprintf(config('error_code')[401],''),
                'code' => 401
            ], 401);
        }

        return redirect()->guest(route('login'));
    }
}
