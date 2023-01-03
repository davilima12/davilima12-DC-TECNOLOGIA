<?php

namespace App\Services;
use App\Repository\UserRepository;

class UserService
{
  protected $userRepository;

  public function __construct(UserRepository $userRepository){
    $this->userRepository = $userRepository;
  }

  public function register(array $request)
  {
    return $this->userRepository->register($request);
  }
}
