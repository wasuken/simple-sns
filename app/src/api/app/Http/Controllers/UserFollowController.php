<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserComment;
use App\Models\User;

class UserFollowController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $user = $request->user();
        $following = UserComment::where('following_user_id', $user->id)->get();
        $followed = UserComment::where('followed_user_id', $user->id)->get();
        return [
            'following' => $following,
            'followed' => $followed,
        ];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $followed_user_id = $requst->input('followed_user_id');
        $followed_user = User::find($followed_user_id);

        $following_user = $request->user();
        UserComment::create([
            'folloed_user_id' => $followed_user_id,
            'following_user_id' => $following_user->id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $followed_user_id = $requst->input('followed_user_id');
        $followed_user = User::find($followed_user_id);

        $following_user = $request->user();
        UserComment::where(
            'following_user_id',
            $following_user->id
        )
            ->where('folloed_user_id', $followed_user_id)
            ->delete();
    }
}
