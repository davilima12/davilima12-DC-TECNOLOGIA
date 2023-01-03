<?php

namespace App\Services;
use App\Repository\ClienteRepository;

class ClienteService
{
    private $clienteRepository;
    public function __construct(ClienteRepository $clienteRepository)
    {
        $this->clienteRepository = $clienteRepository;
    }

    public function store(array $request)
    {
        
        return $this->clienteRepository->store($request);
    }

    public function buscarClientes()
    {
        return $this->clienteRepository->buscarClientes();
    }

    public function editarCliente(array $request)
    {
        return $this->clienteRepository->editarCliente($request);
    }

    public function deletaCliente(int $clienteId)
    {
        return $this->clienteRepository->deletaCliente($clienteId);
    }
}
