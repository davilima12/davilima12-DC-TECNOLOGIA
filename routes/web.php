<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendaController;

// rota login
Route::get('/', [AuthenticationController::class, 'show'])->name('login.inicial');
Route::post('/', [AuthenticationController::class, 'login'])->name('login.inicial');

// cadastrar usuario
Route::get('register', [UserController::class, 'showRegister'])->name('show-register');
Route::post('register', [UserController::class, 'register'])->name('auth-register');

//so ter acesso se usuario estiver authenticado
Route::middleware(['authUser'])->group(function () {
  Route::get('visualizar/produto', [ProdutoController::class, 'index'])->name('visualizar-produto');
  Route::get('cadastrar/produto', [ProdutoController::class, 'create'])->name('cadastrar-produto');

  Route::get('visualizar/cliente', [ClienteController::class, 'index'])->name('visualizar-cliente');
  Route::get('cadastrar/cliente', [ClienteController::class, 'create'])->name('cadastrar-cliente');

  Route::get('visualizar/venda', [VendaController::class, 'index'])->name('visualizar-venda');
  Route::get('cadastrar/venda', [VendaController::class, 'create'])->name('cadastrar-venda');

  Route::get('logout', [AuthenticationController::class, 'logout'])->name('auth-logout');
});
