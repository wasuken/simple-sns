<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserPostController;
use App\Http\Controllers\UserCommentController;
use App\Http\Controllers\UserFollowController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/tokens/create', function (Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

// ユーザー登録
Route::post('/register', [RegisterController::class, 'register']);

// ログイン
Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')
    ->delete('/logout', [LoginController::class, 'logout']);

Route::middleware('auth:sanctum')
    ->get('/posts', [UserPostController::class, 'index']);
Route::middleware('auth:sanctum')
    ->post('/post', [UserPostController::class, 'store']);

Route::middleware('auth:sanctum')
    ->get('/comments', [UserCommentController::class, 'index']);
Route::middleware('auth:sanctum')
    ->post('/comment', [UserCommentController::class, 'store']);

Route::middleware('auth:sanctum')
    ->get('/follows', [UserFollowController::class, 'index']);
Route::middleware('auth:sanctum')
    ->post('/follow', [UserFollowController::class, 'store']);
Route::middleware('auth:sanctum')
    ->delete('/follow', [UserFollowController::class, 'destroy']);
