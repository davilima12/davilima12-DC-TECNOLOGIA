$(function () {
  'use strict';
  
  function formatarDadosSelect2(data){
    var dados = [];
    for (const key in data) {
      dados.push({ id: data[key].id, text: data[key].nome });
    }
    return dados
  }

  function buscaMarcas() {
    $.ajax({
      url: '/api/buscar/marcas',
      method: 'GET',
    }).done(function (data) {
      $('#marca').select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  function buscaVersao() {
    $.ajax({
      url: '/api/buscar/versao',
      method: 'GET',
    }).done(function (data) {
      $('#versao').select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  function buscaModelo() {
    $.ajax({
      url: '/api/buscar/modelos',
      method: 'GET',
    }).done(function (data) {
      $('#modelo').select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  //funcoes que buscam os dados de marcas versoes e modelos e prenche o select
  buscaMarcas()
  buscaVersao()
  buscaModelo()

  var bsStepper = document.querySelectorAll('.bs-stepper'),
  horizontalWizard = document.querySelector('.horizontal-wizard-example');

  if (typeof horizontalWizard !== undefined && horizontalWizard !== null) {
    var numberedStepper = new Stepper(horizontalWizard),
      $form = $(horizontalWizard).find('form');
    $form.each(function () {
      var $this = $(this);
      $this.validate({
        rules: {
          versao: {
            required: true,
          },
          marca: {
            required: true,
          },
          modelo: {
            required: true,
          },
          nome: {
            required: true,
          },
        },
      });
    });

  }

  var pageResetForm = $('.cadastra-veiculo');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        nome: {
          required: true,
        },
        versao: {
          required: true,
        },
        marca: {
          required: true,
        },
        modelo: {
          required: true,
        }
      },
    });
  }

  $('#cadastrar').on('click', function (e) {
    e.preventDefault();
    if (pageResetForm.valid()) {
      $.ajax({
        url: '/api/cadastrar/veiculo',
        method: 'POST',
        data: {
          'nome': $('#nome').val(),
          'usuario_id': $('#usuarioId').val(),
          'marca_id': $('#marca').val(),
          'modelo_id': $('#modelo').val(),
          'versao_id': $('#versao').val(),
        },
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content'),
        },
      }).done(function (data) {
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: true,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        }).then((result) => {
          window.location.href = '/visualizar/veiculo';
        });
      });
    }
  });
});
