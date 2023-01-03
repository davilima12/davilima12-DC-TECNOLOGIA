<?php

namespace App\Repository;

use App\Models\Parcela;
use App\Models\Produto;
use App\Models\ProdutoVenda;
use App\Models\Venda;

class VendaRepository
{
    private $venda, $produtoVenda, $parcela, $produto;

    public function __construct(Produto $produto, Venda $venda, ProdutoVenda $produtoVenda, Parcela $parcela)
    {
        $this->venda = $venda;
        $this->produtoVenda = $produtoVenda;
        $this->parcela = $parcela;
        $this->produto = $produto;
    }

    public function salvarVenda(array $array)
    {
        return $this->venda->create(
            [
                'usuario_id' => $array['usuario_id'],
                'cliente_id' => $array['cliente_id'],
                'forma_pagamento_id' => $array['forma_pagamento_id'],
                'quantidade_parcelas' => $array['qtdParcelas'] ?? 1,
                'valor_total' => $this->produto->whereIn('id', $array['produto_id'])->sum('valor')
            ]
        );
    }

    public function salvarProdutoVenda(array $array, $vendaId)
    {
        foreach ($array as $produto) {
            $this->produtoVenda->create(
                [
                    'produto_id' => $produto,
                    'venda_id' => $vendaId,
                ]
            );
        }
    }

    public function salvarParcelas(array $array, $vendaId)
    {
        foreach ($array as $index => $parcela) {
            $this->parcela->create(
                [
                    'valor' => $parcela['valor'],
                    'data_pagamento' => $parcela['data'],
                    'venda_id' => $vendaId,
                    'observacoes' => $parcela['observacoes'] ?? '',
                ]
            );
        }
    }

    public function buscarVenda(int $usuarioId)
    {
        return $this->venda->select(
            'vendas.id',
            'vendas.quantidade_parcelas',
            'vendas.valor_total',
            'forma_pagamentos.nome as forma_pagamento',
            'users.name as usuario',
            'clientes.nome as cliente'
        )
            ->join('users', 'users.id', 'vendas.usuario_id')
            ->join('clientes', 'clientes.id', 'vendas.cliente_id')
            ->join('forma_pagamentos', 'forma_pagamentos.id', 'vendas.forma_pagamento_id')
            ->where('vendas.usuario_id', $usuarioId)
            ->get();
    }

    public function editarVenda(array $request)
    {
        return $this->venda
            ->find($request['vendaId'])
            ->update(
                [
                    'nome' => $request['nome'],
                    'usuario_id' => $request['usuario_id'],
                    'marca_id' => $request['marca_id'],
                    'modelo_id' => $request['modelo_id'],
                    'versao_id' => $request['versao_id'],
                ]
            );
    }

    public function deletaParcelasVenda(int $vendaId)
    {
        return $this->parcela
                    ->where('venda_id', $vendaId)
                    ->delete();
    }

    public function deletaVendaProduto(int $vendaId)
    {
        return $this->produtoVenda->where('venda_id', $vendaId)->delete();
    }

    public function deletaVenda(int $vendaId)
    {
        return $this->venda->find($vendaId)->delete();
    }
}
