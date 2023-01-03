<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutoVenda extends Model
{
    use HasFactory;
    protected $fillable = [
        'produto_id',
        'venda_id'
    ];
}
