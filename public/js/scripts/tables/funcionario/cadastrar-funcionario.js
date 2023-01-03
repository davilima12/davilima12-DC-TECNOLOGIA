$(function () {
  'use strict';
  var dados = [];
  buscaDadosDosCargos();

  var numeralMask = $('.numeral-mask');
  var cpfMask = $('.cpf-mask');

  if (cpfMask.length) {
    new Cleave(cpfMask, {
      delimiters: ['.', '.', '-'],
      blocks: [3, 3, 3, 2],
      numericOnly: true,
      delimiterLazyShow: true,
    });
  }

  if (numeralMask.length) {
    new Cleave(numeralMask, {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand',
    });
  }

  function buscaDadosDosCargos() {
    $.ajax({
      url: '/api/buscar/cargos',
      data: { empresaId: empresaId },
      method: 'GET',
    }).done(function (data) {
      for (const key in data) {
        dados.push({ id: data[key].id, text: data[key].nome });
      }
      $('#cargo').select2({
        data: dados,
      });
    });
  }
  var pageResetForm = $('.cadastra-funcionarios');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        nome: {
          required: true,
        },
        cpf: {
          required: true,
        },
        idade: {
          required: true,
        },
        salario: {
          required: true,
        },
        cargo: {
          required: true,
        },
      },
    });
  }

  $('#cadastrar').on('click', function (e) {
    e.preventDefault();
    if (pageResetForm.valid()) {
      $.ajax({
        url: '/api/cadastrar/funcionario',
        method: 'POST',
        data: $('.cadastra-funcionarios').serialize(),
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
          window.location.href = '/funcionarios/listar/funcionario';
        });
      });
    }
  });
});
