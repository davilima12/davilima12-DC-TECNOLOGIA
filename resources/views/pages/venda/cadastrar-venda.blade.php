@extends('layouts/contentLayoutMaster')

@section('title', 'Cadastrar Vendas')

@section('vendor-style')
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/select/select2.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/base/pages/page-auth.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/animate/animate.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/extensions/sweetalert2.min.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('vendors/css/forms/wizard/bs-stepper.min.css')) }}">
@endsection

@section('page-style')
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/extensions/ext-component-sweet-alerts.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-wizard.css')) }}">
@endsection

<style>
    .nao-tem-parcelas {
        display: none !important;
    }

    .tem-parcelas {
        display: flex !important;
    }

    .numero-parcela {
        background-color: #ff9f43;
        height: 70px;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<meta name="csrf-token" content="{{ csrf_token() }}" />
@section('content')
    <section class="horizontal-wizard">
        <div class="bs-stepper horizontal-wizard-example">
            <div class="bs-stepper-header">
                <div class="step" data-target="#account-details">
                    <button type="button" class="step-trigger">
                        <span class="bs-stepper-box">1</span>
                        <span class="bs-stepper-label">
                            <span class="bs-stepper-title">Cadastro de Vendas</span>
                            <span class="bs-stepper-subtitle">Detalhes das vendas</span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="bs-stepper-content row">
                <div id="account-details" class="content col">
                    <form class="form cadastra-venda">
                        <input type="hidden" name="usuarioId" id="usuarioId" value="{{ Auth()->user()->id }}">
                        <div class="row">
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="produto">Produtos</label>
                                    <select class="select2 form-control" multiple id="produto" required name="produto[]">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="cliente">Cliente</label>
                                    <select class="select2 form-control" required id="cliente" name="cliente">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 col-12">
                                <div class="form-group">
                                    <label for="formaPagamento">Formas de Pagamento</label>
                                    <select class="select2 form-control" id="formaPagamento" required name="formaPagamento">
                                    </select>
                                </div>
                            </div>
                            <div class="col-12 nao-tem-parcelas mt-2" id="tem-parcelas">

                                <div class="col-md-6 col-12 m-0 p-0">
                                    <div class="form-group">
                                        <label for="qtdParcelas">Quantidade de parcelas</label>
                                        <input type="number" name="qtdParcelas" class="form-control" id="qtdParcelas">
                                    </div>
                                </div>

                                <div class="col-md-6 col-12 m-0 p-0 m-2">
                                    <a class="btn btn-warning text-right" id="gerarParcelas">
                                        <span class="align-middle d-sm-inline-block d-none">Gerar Parcelas</span>
                                    </a>
                                </div>

                            </div>

                            <div id="todas-parcelas" class="col-12 m-0 p-0"></div>
                    </form>
                </div>
                <div class="col text-start" style="text-align: right;">
                    <button class="btn btn-primary text-right" id="cadastrar">
                        <span class="align-middle d-sm-inline-block d-none">Cadastrar</span>
                    </button>
                </div>
            </div>
        </div>
        </div>
    </section>
@endsection
@section('vendor-script')
    <script src="{{ asset(mix('vendors/js/forms/select/select2.full.min.js')) }}"></script>
    <script src="{{ asset('vendors/js/forms/validation/jquery.validate.min.js') }}"></script>
    <script src="{{ asset(mix('vendors/js/extensions/sweetalert2.all.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/extensions/polyfill.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/forms/cleave/cleave.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/forms/cleave/addons/cleave-phone.us.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/forms/wizard/bs-stepper.min.js')) }}"></script>
    <script src="{{ asset(mix('vendors/js/forms/validation/jquery.validate.min.js')) }}"></script>
@endsection

@section('page-script')
    <script>
        const usuarioId = @json(Auth()->user()->id);
    </script>
    <script src="{{ asset(mix('js/scripts/pages/mask-money.js')) }}"></script>
    <script src="{{ asset(mix('js/scripts/pages/form-validate-pt-br.js')) }}"></script>
    <script src="{{ asset(mix('js/scripts/pages/venda/cadastrar-venda.js')) }}"></script>
@endsection
