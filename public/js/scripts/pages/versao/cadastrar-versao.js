$(function () {
  'use strict';

  var pageResetForm = $('.form-versao');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        nome: {
          required: true,
        },
      },
    });
  }

  $('#cadastra-versao').on('click', function (e) {
    e.preventDefault();
    if (pageResetForm.valid()) {
      $.ajax({
        url: '/api/cadastrar/versao',
        method: 'POST',
        data: pageResetForm.serialize(),
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
          window.location.href = '/visualizar/versao';
        });
      });
    }
  });
});
