@extends('layouts/contentLayoutMaster')

@section('title', 'Cadastrar Cliente')

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
    #formulario-cliente {
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
                <div class="row" id="formulario-cliente">
                    <div class="col-8">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Novo Cliente</h4>
                            </div>
                            <div class="card-body">
                                <form class="cliente-form">
                                    <div class="row">
                                        <div class="col-12">
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
                                        <div class="col-12">
                                            <button type="submit"
                                                class="btn btn-primary  
                                                mr-1"
                                                id="cadastra-cliente">Cadastrar</button>
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
    <script src="{{ asset(mix('js/scripts/pages/cliente/cadastrar-cliente.js')) }}"></script>
    <script src="{{ asset(mix('js/scripts/pages/form-validate-pt-br.js')) }}"></script>
@endsection
