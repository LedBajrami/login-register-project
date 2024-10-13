<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\PersonalAccessTokenFactory;
use Laravel\Passport\TokenRepository;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    
public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Use TokenRepository and PersonalAccessTokenFactory to issue token
            $tokenRepository = app(TokenRepository::class);
            $personalAccessTokenFactory = app(PersonalAccessTokenFactory::class);

            $token = $personalAccessTokenFactory->make($user, 'LoginRegister', []);

            return response()->json(['user' => $user, 'token' => $token->accessToken], 200);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }









    public function profile()
    {
        $user = Auth::user();  // This retrieves the authenticated user

        dd($user);

        if ($user) {
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_photos' => $user->profile_photos,
            ], 200);
        }

        return response()->json(['error' => 'User not authenticated'], 401);
    }






    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        $user = Auth::user();
    
        if (!$user) {
            // Return error if the user is not authenticated
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        $path = $request->file('photo')->store('profile_photos', 'public');
    
        // Delete old photo if exists
        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }
    
        // Save new photo path
        $user->profile_photo = $path;
        $user->save();
    
        return response()->json(['message' => 'Photo uploaded successfully', 'path' => $path]);
    }
    
}




