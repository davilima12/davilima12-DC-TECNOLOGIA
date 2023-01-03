<?php

namespace App\Repository;

use App\Models\User;

class UserRepository
{

  protected $userModel;

  public function __construct(User $userModel){
    $this->userModel = $userModel;
  }

  public function register(array $request)
  {
    $this->userModel::create(
      [
        'email' => $request['email'],
        'password' => bcrypt($request['password']),
        'name' => $request['name']
      ]
    );
  }
}
