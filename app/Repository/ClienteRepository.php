<?php

namespace App\Repository;

use App\Models\Cliente;

class ClienteRepository
{
    private $cliente;
    public function __construct(Cliente $cliente)
    {
        $this->cliente = $cliente;
    }

    public function store($request)
    {
        return $this->cliente->create([
            'nome' => $request['nome'],
        ]);
    }

    public function buscarClientes()
    {
        return $this->cliente->get();
    }

    public function editarCliente(array $request)
    {
        return $this->cliente
                    ->find($request['clienteId'])
                    ->update(['nome' => $request['nome']]);
    }

    public function deletaCliente(int $clienteId)
    {
        return $this->cliente->find($clienteId)->delete();
    }
}
