<?php

namespace App\Repository;

use App\Models\Produto;

class ProdutoRepository
{
    private $produto;
    public function __construct(Produto $produto)
    {
        $this->produto = $produto;
    }

    public function store($request)
    {
        return $this->produto->create([
            'nome' => $request['nome'],
            'valor' => $request['valor'],
        ]);
    }

    public function buscarProdutos()
    {
        return $this->produto->get();
    }

    public function buscarProdutosPorId(array $array){
        return $this->produto
                    ->whereIn('id', $array['arrayIds'])
                    ->get();
    }

    public function editarProduto(array $request)
    {
        return $this->produto
                    ->find($request['produtoId'])
                    ->update(
                        [
                            'nome' => $request['nome'],
                            'valor' => $request['valor'],
                        ]
                    );
    }

    public function deletaProduto(int $produtoId)
    {
        return $this->produto->find($produtoId)->delete();
    }
}
