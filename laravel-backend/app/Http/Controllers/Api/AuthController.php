<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Spatie\Permission\Traits\HasRoles;



class AuthController extends Controller
{
    /**
     * Register a new user
     */
    use HasRoles;
    public function register(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|unique:users,email',
        //     'password' => 'required|string|min:8',
        // ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('user');
        $user->givePermissionTo(['read tasks']);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
    public function registerAdmin(Request $request)
    {
        // if (!Auth::user()->hasRole('admin')) {
        //     abort(403, 'Unauthorized action.');
        // }

        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|string|email|unique:users,email',
        //     'password' => 'required|string|min:8',
        // ]);

        $adminUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        // Assign the "user" role to the new user
        $adminUser->assignRole('admin');
        $adminUser->givePermissionTo(['create tasks', 'update tasks', 'delete tasks']);


        return response()->json(['message' => 'Admin user registered successfully', 'user' => $adminUser], 201);
    }

    public function adminLogin(Request $request)
    {

        //Admin login
        $adminUser = User::where('email', $request->email)->first();

        if (!$adminUser || !Hash::check($request->password, $adminUser->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Create a token for the admin user
        $token = $adminUser->createToken('admin-auth-token')->plainTextToken;
     
        return response()->json(['message' => 'Admin login successful', 'token' => $token , 'user_id' => $adminUser -> id]);
    }

    /**
     * Login user and create a token.
     */
    public function login(Request $request)
    {
        // $request->validate([
        //     'email' => 'required|string|email',
        //     'password' => 'required|string',
        // ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;


        return response()->json(['message' => 'Login successful', 'token' => $token, 'user_id' => $user -> id]);
    }

    /**
     * Logout user and revoke the token from the user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout successful']);
    }
}
