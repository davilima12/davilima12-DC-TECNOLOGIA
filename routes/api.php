<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\VendaController;
use App\Models\FormaPagamento;
use Illuminate\Support\Facades\Route;

Route::post('cadastrar/produto', [ProdutoController::class, 'store']);
Route::get('buscar/produtos', [ProdutoController::class, 'buscarProdutos']);
Route::put('editar/produto', [ProdutoController::class, 'editarProduto']);
Route::delete('deletar/produto', [ProdutoController::class, 'deletaProduto']);
Route::get('buscar/produtos-por-id', [ProdutoController::class, 'buscarProdutosPorId']);

Route::post('cadastrar/cliente', [ClienteController::class, 'store']);
Route::get('buscar/clientes', [ClienteController::class, 'buscarClientes']);
Route::put('editar/cliente', [ClienteController::class, 'editarCliente']);
Route::delete('deletar/cliente', [ClienteController::class, 'deletaCliente']);

Route::get('buscar/vendas', [VendaController::class, 'buscarVendas']);
Route::post('cadastrar/venda', [VendaController::class, 'store']);
Route::put('editar/venda', [VendaController::class, 'editarVenda']);
Route::delete('deletar/venda', [VendaController::class, 'deletaVenda']);


//poderia criar o controller o service e o repository!!
Route::get('buscar/forma-pagamento', function(){
   return response()->json(FormaPagamento::get());
}); 

