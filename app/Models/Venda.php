<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venda extends Model
{
    use HasFactory;
    protected $fillable = [
        'cliente_id',
        'usuario_id',
        'forma_pagamento_id',
        'quantidade_parcelas',
        'valor_total'
    ];
}
