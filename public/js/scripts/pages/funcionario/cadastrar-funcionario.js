$(function () {
  'use strict';
  var dados = [];
  buscaDadosDosCargos();

  var numeralMask = $('.numeral-mask'),
    cpfMask = $('.cpf-mask'),
    bsStepper = document.querySelectorAll('.bs-stepper'),
    horizontalWizard = document.querySelector('.horizontal-wizard-example');

  // Adds crossed class
  if (typeof bsStepper !== undefined && bsStepper !== null) {
    for (var el = 0; el < bsStepper.length; ++el) {
      bsStepper[el].addEventListener('show.bs-stepper', function (event) {
        var index = event.detail.indexStep;
        var numberOfSteps = $(event.target).find('.step').length - 1;
        var line = $(event.target).find('.step');

        for (var i = 0; i < index; i++) {
          line[i].classList.add('crossed');

          for (var j = index; j < numberOfSteps; j++) {
            line[j].classList.remove('crossed');
          }
        }
        if (event.detail.to == 0) {
          for (var k = index; k < numberOfSteps; k++) {
            line[k].classList.remove('crossed');
          }
          line[0].classList.remove('crossed');
        }
      });
    }
  }

  // Horizontal Wizard
  // --------------------------------------------------------------------
  if (typeof horizontalWizard !== undefined && horizontalWizard !== null) {
    var numberedStepper = new Stepper(horizontalWizard),
      $form = $(horizontalWizard).find('form');
    $form.each(function () {
      var $this = $(this);
      $this.validate({
        rules: {
          username: {
            required: true,
          },
          email: {
            required: true,
          },
          password: {
            required: true,
          },
          'confirm-password': {
            required: true,
            equalTo: '#password',
          },
          'first-name': {
            required: true,
          },
          'last-name': {
            required: true,
          },
          address: {
            required: true,
          },
          landmark: {
            required: true,
          },
          country: {
            required: true,
          },
          language: {
            required: true,
          },
          twitter: {
            required: true,
            url: true,
          },
          facebook: {
            required: true,
            url: true,
          },
          google: {
            required: true,
            url: true,
          },
          linkedin: {
            required: true,
            url: true,
          },
        },
      });
    });

    $(horizontalWizard)
      .find('.btn-next')
      .each(function () {
        $(this).on('click', function (e) {
          var isValid = $(this).parent().siblings('form').valid();
          if (isValid) {
            numberedStepper.next();
          } else {
            e.preventDefault();
          }
        });
      });

    $(horizontalWizard)
      .find('.btn-prev')
      .on('click', function () {
        numberedStepper.previous();
      });

    $(horizontalWizard)
      .find('.btn-submit')
      .on('click', function () {
        var isValid = $(this).parent().siblings('form').valid();
        if (isValid) {
          alert('Submitted..!!');
        }
      });
  }

  if (cpfMask.length) {
    new Cleave(cpfMask, {
      delimiters: ['.', '.', '-'],
      blocks: [3, 3, 3, 2],
      numericOnly: true,
      delimiterLazyShow: true,
    });
  }

  $('#salario').maskMoney({
    prefix: 'R$ ',
    allowNegative: true,
    thousands: '.',
    decimal: ',',
    affixesStay: true,
  });

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
          window.location.href = '/funcionarios/listar/funcionario';
        });
      });
    }
  });
});
