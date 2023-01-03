@extends('layouts/contentLayoutMaster')

@section('title', 'Vendas')

@section('vendor-style')
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/dataTables.bootstrap4.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/tables/datatable/responsive.bootstrap4.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/pickers/flatpickr/flatpickr.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/animate/animate.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/sweetalert2.min.css')) }}">
@endsection

<style>
    .bakcground-none{
        background-color:transparent !important;
    }
</style>
@section('content')
    <section id="tabela-cargos">
        <div class="row" id="formulario-venda">
            <div class="col-12">
                <div class="card">
                    <div class="card-header border-bottom">
                        <h4 class="card-title">Todas as Vendas</h4>
                    </div>
                    <div class="card-datatable">
                        <table class="datatables-venda table">
                            <thead>
                                <tr>
                                    <th>Valor Total</th>
                                    <th>Quantidade de Parcelas</th>
                                    <th>Forma de Pagamento</th>
                                    <th>Responsavel pelo cadastro</th>
                                    <th>Cliente</th>
                                    <th class="cell-fit">Ações</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('vendor-script')
    <script src="{{ asset(mix('vendors/js/tables/datatable/jquery.dataTables.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/datatables.bootstrap4.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/dataTables.responsive.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/tables/datatable/responsive.bootstrap4.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/extensions/polyfill.min.js')) }}"></script>
@endsection

@section('page-script')
    <script>
        const usuarioId = @json(Auth()->user()->id);
    </script>
    <script src="{{ asset(mix('js/scripts/pages/venda/listar-venda.js')) }}"></script>
@endsection
