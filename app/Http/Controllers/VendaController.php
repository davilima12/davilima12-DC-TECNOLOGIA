<?php

namespace App\Http\Controllers;

use App\Http\Requests\VendaRequest;
use App\Services\VendaService;
use Exception;
use Illuminate\Http\Request;

class VendaController extends Controller
{
    private $vendaService;
    public function __construct(VendaService $vendaService)
    {
        $this->vendaService = $vendaService;
    }

    public function index()
    {
        return view('pages.venda.listar-venda');
    }

    public function create()
    {
        return view('pages.venda.cadastrar-venda');
    }

    public function store(VendaRequest $request)
    {
        try{
            $this->vendaService->store($request->all());
            return response()->json('Venda cadastrada com sucesso');
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        }   
    }

    public function buscarVendas(Request $request)
    {
        try{
            return response()->json($this->vendaService->buscarVenda($request->usuarioId));
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
        
    }

    public function editarVenda(VendaRequest $request)
    {
        try{
            $this->vendaService->editarVenda($request->all());
            return response()->json('Cliente editado com sucesso');
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
    }


    public function deletaVenda(Request $request)
    {
        try{
            $this->vendaService->deletaVenda($request->vendaId);
            return response()->json('Venda deletado com sucesso');
        } catch (Exception $e) {
            return response()->json('error', 404);
        } 
        
    }
}
