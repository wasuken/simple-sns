<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserPost;
use App\Models\UserComment;

class UserPostController extends Controller
{
    //
    public function index(Request $request)
    {
        $posts = UserPost::limit(10)->get()->toArray();

        $pids = [];
        $uids = [];
        foreach($posts as $p){
            $pids[$p['id']] = $p;
            $pids[$p['id']]['comments'] = [];
            $uids[] = $p['user_id'];
        }
        $users = User::whereIn('id', $uids)->get()->toArray();
        $uname_map = [];
        foreach($users as $u){
            $uname_map[$u['id']] = $u['name'];
        }
        foreach($posts as $p){
            $username = $uname_map[$p['user_id']];
            $pids[$p['id']]['username'] = $username;
        }
        $comments = UserComment::whereIn('post_id', array_keys($pids))->get()->toArray();
        foreach($comments as $c){
            $cm = $c;
            $pid = $cm['post_id'];
            $username = $uname_map[$cm['user_id']];
            $cm['username'] = $username;
            $pids[$pid]['comments'][] = $cm;
        }
        return array_values($pids);
    }
    public function store(Request $request)
    {
        UserPost::create([
            'user_id' => $request->user()->id,
            'content' => $request->input('content'),
            'title' => $request->input('title'),
        ]);
    }
}
