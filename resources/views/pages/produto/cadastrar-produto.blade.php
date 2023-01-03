@extends('layouts/contentLayoutMaster')

@section('title', 'Cadastrar Produto')

@section('vendor-style')
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/base/pages/page-auth.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/animate/animate.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/sweetalert2.min.css')) }}">
@endsection

@section('page-style')
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-sweet-alerts.css')) }}">
@endsection

<style>
    #formulario-produto {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>
<meta name="csrf-token" content="{{ csrf_token() }}" />
@section('content')
    <section id="basic-horizontal-layouts">
        <div class="row">
            <div class="col-12">
                <div class="row" id="formulario-produto">
                    <div class="col-8">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Novo Produto</h4>
                            </div>
                            <div class="card-body">
                                <form class="produto-form">
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="nome">Nome</label>
                                                <div class="input-group input-group-merge">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text"><i data-feather="award"></i></span>
                                                    </div>
                                                    <input type="text" id="nome" required class="form-control"
                                                        name="nome" required placeholder="nome" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="form-group">
                                                <label for="nome">Valor</label>
                                                <div class="input-group input-group-merge">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text">R$</span>
                                                    </div>
                                                    <input type="text" id="valor" required class="form-control"
                                                        name="valor" required  />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button type="submit"
                                                class="btn btn-primary  
                                                mr-1"
                                                id="cadastra-produto">Cadastrar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
@endsection
@section('vendor-script')
    <script src="{{ asset('vendors/js/forms/validation/jquery.validate.min.js') }}"></script>
    <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
    
@endsection

@section('page-script')
    <script src="{{ asset(mix('js/scripts/pages/mask-money.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
    <script src="{{ asset(mix('js/scripts/pages/form-validate-pt-br.js')) }}"></script>
    <script src="{{ asset(mix('js/scripts/pages/produto/cadastrar-produto.js')) }}"></script>
@endsection
