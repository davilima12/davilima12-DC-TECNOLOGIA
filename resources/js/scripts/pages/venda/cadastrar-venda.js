$(function () {
  'use strict';
  var parcelaGerada = false;
  $('#produto').select2()

  //exibi ou nao as parcelas de acordo com a forma de pagamento
  $('#formaPagamento').on('change', function () {
    if ($(this).val() == 2) {
      $('#tem-parcelas').removeClass('nao-tem-parcelas').addClass('tem-parcelas')
      $('#qtdParcelas').prop('required', true);
    } else {
      $('#tem-parcelas').removeClass('tem-parcelas').addClass('nao-tem-parcelas')
      $('#qtdParcelas').prop('required', false);
    }
  })

  //exibi ou nao as parcelas de acordo com a forma de pagamento
  $('#gerarParcelas').on('click', function (e) {
    e.preventDefault()
    if ($('#produto').val() != '') {
      
      var valorDosProdutos = 0;
      let arrayIds = $('#produto').val()
      $.ajax({
        url: '/api/buscar/produtos-por-id',
        method: 'GET',
        data:{arrayIds}
      }).done(function (data) {
        for (const key in data) {
          valorDosProdutos += parseFloat(data[key].valor.replace('.', ''))
          
        }
        parcelaGerada = true;
        $('#todas-parcelas').html('')
        let qtdParcelas = $('#qtdParcelas').val()
        for (let $i = 1; $i <= qtdParcelas; $i++) {
          $('#todas-parcelas').append('<div class="col-12  tem-parcelas">' +
            '<div class="col-md-3 col-12 d-flex">' +
            '<div class="numero-parcela">' +
            '<h1 class="text-white">' + $i + '.</h1>' +
            '</div>' +
            '<div class="form-group">' +
            `<label for="data${$i} ">Data</label>` +
            `<input type="date" name="data${$i}" class="form-control" required>` +
            '</div>' +
            '</div>' +
  
            '<div class="col-md-4">' +
            '<div class="form-group">' +
            `<label for="valor${$i}">Valor</label>` +
            '<div class="input-group input-group-merge">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text">R$</span>' +
            '</div>' +
            `<input type="text" required name="valor${$i}" value="${(valorDosProdutos / qtdParcelas).toFixed(2)}" class="form-control valor">` +
            '</div>' +
            '</div>' +
            '</div>' +
  
            '<div class="col-md-4 col-12">' +
            '<div class="form-group">' +
            `<label for="observacoes${$i}">Observações</label>` +
            `<input type="text" name="observacoes${$i}" class="form-control">` +
            '</div>' +
            '</div>'
          );
          $('.valor').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
        }
      });



    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Porfavor antes de gerar as parcelas selecione os produtos',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      });
    }


  })

  function formatarDadosSelect2(data) {
    var dados = [];
    for (const key in data) {
      dados.push({ id: data[key].id, text: data[key].nome });
    }
    return dados
  }

  function buscaClientes() {
    $.ajax({
      url: '/api/buscar/clientes',
      method: 'GET',
    }).done(function (data) {
      $('#cliente').select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  function buscaProdutos() {
    $.ajax({
      url: '/api/buscar/produtos',
      method: 'GET',
    }).done(function (data) {
      $('#produto').select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  function buscaFormaPagamento() {
    $.ajax({
      url: '/api/buscar/forma-pagamento',
      method: 'GET',
    }).done(function (data) {
      $('#formaPagamento').select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  //funcoes que buscam os dados de marcas versoes e modelos e prenche o select
  buscaClientes()
  buscaProdutos()
  buscaFormaPagamento()

  var bsStepper = document.querySelectorAll('.bs-stepper'),
    horizontalWizard = document.querySelector('.horizontal-wizard-example');

  if (typeof horizontalWizard !== undefined && horizontalWizard !== null) {
    var numberedStepper = new Stepper(horizontalWizard),
      $form = $(horizontalWizard).find('form');
    $form.each(function () {
      var $this = $(this);
      $this.validate({
        rules: {
          produto: {
            required: true,
          },
          cliente: {
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
    });

  }

  var pageResetForm = $('.cadastra-venda');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        produto: {
          required: true,
        },
        cliente:{
          required:true,
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
    if ((parcelaGerada && $('#formaPagamento').val() == 2) || (!parcelaGerada && $('#formaPagamento').val() == 1)) {
      if (pageResetForm.valid()) {
        $.ajax({
          url: '/api/cadastrar/venda',
          method: 'POST',
          data: {
            'usuario_id': $('#usuarioId').val(),
            'cliente_id': $('#cliente').val(),
            'forma_pagamento_id': $('#formaPagamento').val(),
            'produto_id': $('#produto').val(),
            'qtdParcelas': $('#qtdParcelas').val(),
            'parcelas': convertFormToJSON('.cadastra-venda')
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
            window.location.href = '/visualizar/venda';
          });
        }).fail(function (data) {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: data.responseJSON,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        });;
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Porfavor gere a quantidade de parcelas',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      });
    }

  });


  function convertFormToJSON(form) {
    return $(form)
      .serializeArray()
      .filter(function(obj){
        if(
            obj.name.includes('produto[]')
           || obj.name.includes('cliente') 
           || obj.name.includes('cliente')
           || obj.name.includes('usuarioId')
           || obj.name.includes('qtdParcelas')
           || obj.name.includes('formaPagamento')
        ){
          return false;
        }else{
          return true
        }
      })
      .reduce(function (json, { name, value }) {
        json[name] = value;
        return json;
      }, {})
  }
});
