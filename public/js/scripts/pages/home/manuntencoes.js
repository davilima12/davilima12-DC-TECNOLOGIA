$(function () {

  carregarTabela();
  function carregarTabela() {
    $.ajax({
      url: '/api/buscar/veiculo',
      data:{usuarioId},
      method: 'GET',
    }).done(function (data) {
      var dt_ajax_table = $('.datatables-veiculo');
      if (dt_ajax_table.length) {
        var dt_ajax = dt_ajax_table.dataTable({
          data: data,
          "destroy": true,
          order: [[1, 'desc']],
          columns: [
            { data: 'veiculo_nome' }, 
            { data: 'nome_usuario' },
            { data: 'marca_nome' },
            { data: 'modelo_nome' },
            { data: 'versoes_nome' },
            { data: '' }
          ],
          columnDefs: [
            {
              targets: 0,
              render: function (data,type, full, meta) {
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<input type="text" disabled value="'+ data +'"  class="form-control bakcground-none editar-nome'+full.veiculo_id+'"'+
                  'name="nome" placeholder="nome" />'+
                  '</div>'
                );
              },
            },
            {
              targets: 2,
              render: function (data, type, full, meta) {
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<select disabled class="select2 form-control bakcground-none marca marca'+full.veiculo_id+'" required name="marca">'+
                  '<option selected >'+full.marca_nome+'</option>'+
                  '</select>'+
                  '</div>'
                )
              },
            },
            {
              targets: 3,
              render: function (data, type, full, meta) {
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<select disabled class="select2 form-control bakcground-none modelo modelo'+full.veiculo_id+'" name="modelo">'+
                  '<option selected>'+full.modelo_nome+'</option>'+
                  '</select>'+
                  '</div>'
                )
              },
            },
            {
              targets: 4,
              render: function (data, type, full, meta) {
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<select disabled class="select2 form-control bakcground-none versao versao'+full.veiculo_id+'"  name="versao">'+
                  '<option selected>'+full.versoes_nome+'</option>'+
                  '</select>'+
                  '</div>'
                )
              },
            },
            {
              // Actions
              targets: -1,
              title: 'Actions',
              width: '80px',
              orderable: false,
              render: function (data, type, full, meta) {
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<a class="mr-1 d-none d-none'+full.veiculo_id+'" data-id='+full.veiculo_id+' data-toggle="tooltip" data-placement="top" title="Editar">' +
                  feather.icons['save'].toSvg({ class: 'font-medium-2 text-success'  }) +
                  '</a>' +
                  '<a class="mr-1 editar" data-id='+full.veiculo_id+' data-toggle="tooltip" data-placement="top" title="Editar">' +
                  feather.icons['edit'].toSvg({ class: 'font-medium-2 text-warning' }) +
                  '</a>' +
                  '<a class="mr-1 deletar" data-id='+full.veiculo_id+'' +
                  ' data-toggle="tooltip" data-placement="top" title="Deletar">' +
                  feather.icons['trash'].toSvg({ class: 'font-medium-2 text-danger' }) +
                  '</a>' +
                  '<div class="dropdown">' +
                  '<a class="btn btn-sm btn-icon px-0" data-toggle="dropdown">' +
                  '</div>' +
                  '</div>'
                );
              }
            }
          ],
          processing: true,
          dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
          language: {
            paginate: {
              previous: '&nbsp;',
              next: '&nbsp;',
            },
          },
        });
      }
    });
  }

  function formatarDadosSelect2(data){
    var dados = [];
    for (const key in data) {
      dados.push({ id: data[key].id, text: data[key].nome });
    }
    return dados
  }

  function buscaMarcas(objeto) {
    $(objeto).html('');
    $.ajax({
      url: '/api/buscar/marcas',
      method: 'GET',
    }).done(function (data) {
      $(objeto).select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  function buscaVersao(objeto) {
    $(objeto).html('');
    $.ajax({
      url: '/api/buscar/versao',
      method: 'GET',
    }).done(function (data) {
      $(objeto).select2({
        data: formatarDadosSelect2(data),
      });
    });
  }

  function buscaModelo(objeto) {
    $(objeto).html('');
    $.ajax({
      url: '/api/buscar/modelos',
      method: 'GET',
    }).done(function (data) {
      $(objeto).select2({
        data: formatarDadosSelect2(data),
      });
    });
  }


  $('body').on('click', '.editar', function(){
    let objetoClicado = $(this)
    let idClicado = $(objetoClicado).data('id')
    $(objetoClicado).addClass('d-none')
    //funcoes que buscam os dados de marcas versoes e modelos e prenche o select
    buscaMarcas(`.marca${idClicado}`)
    buscaVersao(`.versao${idClicado}`)
    buscaModelo(`.modelo${idClicado}`)
    $(`.d-none${idClicado}`).removeClass('d-none')
    $(`.editar-nome${idClicado}`).prop("disabled", false);
    $(`.marca${idClicado}`).prop("disabled", false);
    $(`.modelo${idClicado}`).prop("disabled", false);
    $(`.versao${idClicado}`).prop("disabled", false);
    $(`.editar-nome${idClicado}`).focus()
    $('body').on('click' ,`.d-none${idClicado}`, function(){
      editarVersao(idClicado,
          $(`.editar-nome${idClicado}`).val(), 
          usuarioId, 
          $(`.marca${idClicado}`).val(),
          $(`.modelo${idClicado}`).val(),
          $(`.versao${idClicado}`).val()
        )
      $(`.d-none${idClicado}`).addClass('d-none')
      $(objetoClicado).removeClass('d-none')
      $(`.editar-save${idClicado}`).prop("disabled", true);
      $(`.marca${idClicado}`).prop("disabled", true);
      $(`.modelo${idClicado}`).prop("disabled", true);
      $(`.versao${idClicado}`).prop("disabled", true);
    })
   
  })

  function editarVersao(editaVeiculoId, nome, usuarioId, marca, modelo, versao ){
    Swal.fire({
      title: 'Ateção?',
      text: "Tem certeza que deseja salvar essas alterações?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Salvar!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          url: '/api/editar/veiculo',
          method: 'PUT',
          data:{
            'veiculoId': editaVeiculoId,
              'nome': nome,
              'usuarioId': usuarioId,
              'marca': marca,
              'modelo':modelo,
              'versao': versao,
          },
        }).done(function (data) {
          carregarTabela();
          Swal.fire({
            icon: 'success',
            title: 'Editado!',
            text: data,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        });
        
      }
    });
  }

  $('body').on('click', '.deletar',  function(){
    deletarVeiculo($(this).data('id'))
  })

  function deletarVeiculo(deletarVeiculoId){
    Swal.fire({
      title: 'Ateção?',
      text: "Tem certeza que deseja deletar esse Registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          url: '/api/deletar/veiculo',
          method: 'DELETE',
          data:{'veiculoId':deletarVeiculoId},
        }).done(function (data) {
          carregarTabela();
          Swal.fire({
            icon: 'success',
            title: 'Deletado!',
            text: data,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        });
        
      }
    });
  }
});
