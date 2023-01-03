<?php

namespace Database\Seeders;

use App\Models\FormaPagamento;
use Illuminate\Database\Seeder;

class FormaPagamentoSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FormaPagamento::insert(
            [
                'nome' => 'Avista'
            ]
        );

        FormaPagamento::insert(
            [
                'nome' => 'Parcelado'
            ]
        );
    }
}
