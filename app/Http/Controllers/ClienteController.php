<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClienteRequest;
use App\Services\ClienteService;
use Exception;
use Illuminate\Http\Request;

class ClienteController  extends Controller
{
    private $clienteService;
    public function __construct(ClienteService $clienteService)
    {
        $this->clienteService = $clienteService;
    }

    public function index()
    {
        return view('pages.cliente.listar-cliente');
    }

    public function create()
    {
        return view('pages.cliente.cadastrar-cliente');
    }

    public function store(ClienteRequest $request)
    {
        try{
            $this->clienteService->store($request->all());
            return response()->json('Cliente cadastrada com sucesso');
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
    }

    public function buscarClientes()
    {
        try{
            return $this->clienteService->buscarClientes();
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
        
    }

    public function editarCliente(ClienteRequest $request)
    {
        try{
            $this->clienteService->editarCliente($request->all());
            return response()->json('Cliente editado com sucesso');
        } catch (Exception $e) {
            return response()->json([' exception: ',  $e->getMessage(), "\n"], 404);
        } 
    }

    public function deletaCliente(Request $request)
    {
        try{
            $this->clienteService->deletaCliente($request->clienteId);
            return response()->json('Cliente deletado com sucesso');
        } catch (Exception $e) {
            return response()->json('error', 404);
        } 
    }
}
