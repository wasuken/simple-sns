<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use \Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    //
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::whereEmail($request->email)->first();

            $user->tokens()->delete();
            $token = $user->createToken("login:user{$user->id}")->plainTextToken;

            return response()->json([
                'token' => $token,
                'status' => 200,
                'msg' => '',
            ], Response::HTTP_OK);
        }

        $resp = [
            'status' => 500,
            'msg' => 'auth failed.',
        ];

        return response()
            ->json($resp, Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'msg' => '',
        ], Response::HTTP_OK);
    }
}
