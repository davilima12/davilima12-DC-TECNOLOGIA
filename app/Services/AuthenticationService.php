<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class AuthenticationService
{
  public function userIsValid($request)
  {
    return Auth::attempt(['email' => $request['email'], 'password' => $request['password']]);
  }

  public function logoutUser()
  {
    Auth::logout();
  }
}
