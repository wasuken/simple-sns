<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class PostTest extends TestCase
{
    use DatabaseTransactions;
    public function setUp():void
    {
        parent::setUp();

        $this->user = User::create([
            "email" => "auth_test_user@test.com",
            "password" => bcrypt('auth_test_password'),
            "name" => "test",
        ]);
    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_base()
    {
        $response = $this->json('POST', '/api/login',[
            'email' => 'auth_test_user@test.com',
            'password' => 'auth_test_password',
        ]);
        $token = $response->json('details.token');

        // actingAsヘルパで現在認証済みのユーザーを指定
        $response = $this->actingAs($this->user);
        $response = $this->get('/api/posts');

        $response->assertStatus(200);
    }
    public function test_base_no_login_fail()
    {
        $response = $this->json('DELETE', '/api/logout');
        $response = $this->get('/api/posts');

        $response->assertStatus(200);
    }
}
