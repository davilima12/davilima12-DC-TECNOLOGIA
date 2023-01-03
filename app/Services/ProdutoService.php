<?php

namespace App\Services;
use App\Repository\ProdutoRepository;

class ProdutoService
{
    private $produtoRepository;
    public function __construct(ProdutoRepository $produtoRepository)
    {
        $this->produtoRepository = $produtoRepository;
    }

    public function store(array $request)
    {
        
        return $this->produtoRepository->store($request);
    }

    public function buscarProdutos()
    {
        return $this->produtoRepository->buscarProdutos();
    }
    
    public function buscarProdutosPorId(array $array){
        return $this->produtoRepository->buscarProdutosPorId($array);
    }

    public function editarProduto(array $request)
    {
        return $this->produtoRepository->editarProduto($request);
    }

    public function deletaProduto(int $produtoId)
    {
        return $this->produtoRepository->deletaProduto($produtoId);
    }
}
