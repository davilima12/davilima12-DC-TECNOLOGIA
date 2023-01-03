<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProdutoRequest;
use App\Services\ProdutoService;
use Exception;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    private $produtoService;
    public function __construct(ProdutoService $produtoService)
    {
        $this->produtoService = $produtoService;
    }

    public function index()
    {
        return view('pages.produto.listar-produto');
    }

    public function create()
    {
        return view('pages.produto.cadastrar-produto');
    }

    public function store(ProdutoRequest $request)
    {
        try{
            $this->produtoService->store($request->all());
            return response()->json('Produto cadastrada com sucesso');
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
    }

    public function buscarProdutos()
    {
        try{
            return response()->json($this->produtoService->buscarProdutos());
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
        
    }

    public function buscarProdutosPorId(Request $request){
        return response()->json($this->produtoService->buscarProdutosPorId($request->all()));
    }

    public function editarProduto(ProdutoRequest $request)
    {
        try{
            $this->produtoService->editarProduto($request->all());
            return response()->json('Produto editado com sucesso');
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
    }

    public function deletaProduto(Request $request)
    {
        try{
            $this->produtoService->deletaProduto($request->produtoId);
            return response()->json('Produto deletado com sucesso');
        } catch (Exception $e) {
            return response()->json('error', 404);
        } 
    }
}
