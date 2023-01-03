$(function () {
  'use strict';
  
  function formatarDadosSelect2(data){
    var dados = [];
    for (const key in data) {
      dados.push({ id: data[key].veiculo_id, text: data[key].veiculo_nome });
    }
    return dados
  }

  function buscaVeiculo() {
    $.ajax({
      url: '/api/buscar/veiculo',
      method: 'GET',
      data: {usuarioId},
    }).done(function (data) {
      $('#veiculo').select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  buscaVeiculo()

  var bsStepper = document.querySelectorAll('.bs-stepper'),
  horizontalWizard = document.querySelector('.horizontal-wizard-example');

  if (typeof horizontalWizard !== undefined && horizontalWizard !== null) {
    var numberedStepper = new Stepper(horizontalWizard),
      $form = $(horizontalWizard).find('form');
    $form.each(function () {
      var $this = $(this);
      $this.validate({
        rules: {
          descricao: {
            required: true,
          },
          data:{
            required:true,
          },
          veiculo: {
            required: true,
          },
        },
      });
    });

  }

  var pageResetForm = $('.cadastra-manutencao');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        descricao: {
          required: true,
        },
        data:{
          required:true,
        },
        veiculo: {
          required: true,
        },
      },
    });
  }

  $('#cadastrar').on('click', function (e) {
    e.preventDefault();
    if (pageResetForm.valid()) {
      $.ajax({
        url: '/api/cadastrar/manutencao',
        method: 'POST',
        data: {
          'descricao': $('#descricao').val(),
          'veiculo_id': $('#veiculo').val(),
          'data_agendamento': $('#data').val()
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
          window.location.href = '/visualizar/manutencao';
        });
      });
    }
  });
});
