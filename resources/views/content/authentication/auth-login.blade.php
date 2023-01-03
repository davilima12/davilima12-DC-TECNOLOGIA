@php
    $configData = Helper::applClasses();
@endphp
@extends('layouts/fullLayoutMaster')

@section('title', 'Login')

@section('page-style')
    <link rel="stylesheet" href="{{ asset(mix('css/base/plugins/forms/form-validation.css')) }}">
    <link rel="stylesheet" href="{{ asset(mix('css/base/pages/page-auth.css')) }}">
@endsection

@section('content')
    <div class="auth-wrapper auth-v2">
        <div class="auth-inner row m-0">
            <!-- Left Text-->
            <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
                <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
                    @if ($configData['theme'] === 'dark')
                        <img class="img-fluid" src="{{ asset('images/pages/login-v2-dark.svg') }}" alt="Login V2" />
                    @else
                        <img class="img-fluid" src="{{ asset('images/pages/login-v2.svg') }}" alt="Login V2" />
                    @endif
                </div>
            </div>
            <!-- /Left Text-->
            <!-- Login-->
            <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                    <h2 class="card-title font-weight-bold mb-1">Seja Bem-vindo! &#x1F44B;</h2>
                    <p class="card-text mb-2">Sitema de Gestão</p>
                    @isset($error)
                        <div>

                            <div class="alert alert-danger" role="alert">
                                <h4 class="alert-heading">{{ $error }}</h4>
                            </div>
                        </div>
                    @endisset
                    @isset($sucesso)
                        <div class="alert alert-success" role="alert">
                            <h4 class="alert-heading"> {{ $sucesso }} </h4>
                        </div>
                    @endisset
                    <form class="auth-login-form mt-2" action="{{ route('login.inicial') }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label class="form-label" for="name">E-mail</label>
                            <input class="form-control @error('email') is-invalid @enderror" id="email" type="email"
                                value="{{ old('email') }}" required name="email" placeholder="emplo@exemplo.com"
                                aria-describedby="email" autofocus="" tabindex="1" />
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                        <div class="form-group">
                            <div class="input-group input-group-merge form-password-toggle">
                                <input class="form-control form-control-merge" id="login-password" required
                                    value="{{ old('password') }}" type="password" name="password"
                                    placeholder="············" aria-describedby="password" tabindex="2" />
                                <div class="input-group-append">
                                    <span class="input-group-text cursor-pointer">
                                        <i data-feather="eye"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div div class="custom-control custom-checkbox">
                                <input class="custom-control-input" id="remember-me" name="remember"type="checkbox"
                                    tabindex="3" />
                                <label class="custom-control-label" for="remember-me">Manter conectado</label>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-block" tabindex="4">Entrar</button>
                    </form>
                    <p class="text-center mt-2">
                        <span>Não tem conta?</span>
                        <a href="{{ url('register') }}"><span>&nbsp;Criar Conta</span></a>
                    </p>
                </div>
            </div>
            <!-- /Login-->
        </div>
    </div>
@endsection

@section('vendor-script')
    <script src="{{ asset('vendors/js/forms/validation/jquery.validate.min.js') }}"></script>
    <script src="{{ asset(mix('js/scripts/pages/form-validate-pt-br.js')) }}"></script>
@endsection

@section('page-script')
    <script src="{{ asset(mix('js/scripts/pages/page-auth-login.js')) }}"></script>
@endsection
