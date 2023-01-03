<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
  private $pageConfigs;
  protected $userService;

  public function __construct(UserService $userService){
    $this->userService = $userService;
    $this->pageConfigs = ['blankPage' => true];
  }

  public function showRegister()
  {
    return view('/content/authentication/auth-register', ['pageConfigs' => $this->pageConfigs]);
  }

  public function register(UserRequest $request)
  {
    try{
      $this->userService->register($request->all());
      return view('/content/authentication/auth-login', ['pageConfigs' => $this->pageConfigs])->with('sucesso', 'Cadastro efetuado com sucesso');
    } catch (Exception $e) {
      return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
    }
    
  }
}
