$(function () {
  'use strict';
 $('#valor').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
  var pageResetForm = $('.produto-form');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        nome: {
          required: true,
        },
        valor:{
          required:true,
        }
      },
    });
  }

  $('#cadastra-produto').on('click', function (e) {
    e.preventDefault();
    if (pageResetForm.valid()) {
      $.ajax({
        url: '/api/cadastrar/produto',
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
          window.location.href = '/visualizar/produto';
        });
      });
    }
  });
});
