<?php

namespace App\Http\Controllers;

use App\Services\AuthenticationService;
use Illuminate\Http\Request;
use Exception;



class AuthenticationController extends Controller
{
  private $pageConfigs;
  protected $authenticationService;

  public function __construct(AuthenticationService $authenticationService)
  {
    $this->pageConfigs = ['blankPage' => true];
    $this->authenticationService = $authenticationService;
  }

  public function show()
  {
    return view('content.authentication.auth-login', ['pageConfigs' => $this->pageConfigs]);
  }

  public function login(Request $request)
  {
    try{
      if (!$this->authenticationService->userIsValid($request->all())) {
        return view('content.authentication.auth-login', ['pageConfigs' => $this->pageConfigs])->with('error', 'Úsuario ou senha incorretos');
      }
      return redirect()->route('visualizar-produto');
    } catch (Exception $e) {
      return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
    }
  }

  public function logout()
  {
    $this->authenticationService->logoutUser();
    return redirect()->route('login.inicial');
  }
}
