<?php

namespace App\Services;

use App\Models\Parcela;
use App\Repository\VendaRepository;

class VendaService
{
    private $vendaRepository;
    public function __construct(VendaRepository $vendaRepository)
    {
        $this->vendaRepository = $vendaRepository;
    }

    public function store(array $request)
    {
        $venda = $this->vendaRepository->salvarVenda($request);
        $this->vendaRepository->salvarProdutoVenda($request['produto_id'], $venda->id);
        if(isset($request['parcelas'])){
            $payloadParcelas = $this->buildarPayloadParcelas($request);
            $this->vendaRepository->salvarParcelas($payloadParcelas, $venda->id);
        }


    }

    public function buildarPayloadParcelas($request){
        $parcelas = [];
        foreach($request['parcelas'] as $index => $value){
            preg_match('/\d+/', $index, $posicaoArray);
            $posicaoArray = $posicaoArray[0];
            $variavelSemNumeros = str_replace($posicaoArray, '', $index);
            $parcelas[$posicaoArray][$variavelSemNumeros] = $value;
        }
        return $parcelas;
    }

    public function buscarVenda(int $request)
    { 
        return $this->vendaRepository->buscarVenda($request);
    }

    public function editarVenda(array $request)
    {
        return $this->vendaRepository->editarVenda($request);
    }

    public function deletaVenda(int $marcaId)
    {
        $this->vendaRepository->deletaParcelasVenda($marcaId);
        $this->vendaRepository->deletaParcelasVenda($marcaId);
        $this->vendaRepository->deletaVenda($marcaId);
    }
}
