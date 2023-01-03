$(function () {
  let objetoClicado = null
  let idClicado = null
  carregarTabela();
  function carregarTabela() {
    $.ajax({
      url: '/api/buscar/manutencao',
      data:{usuarioId},
      method: 'GET',
    }).done(function (data) {
      var dt_ajax_table = $('.datatables-manuntencao');
      if (dt_ajax_table.length) {
        var dt_ajax = dt_ajax_table.dataTable({
          data: data,
          "destroy": true,
          order: [[1, 'desc']],
          columns: [
            {data: 'descricao' },
            { data: 'veiculo_nome' }, 
            { data: 'data_agendamento' },
            { data: '' }
          ],
          columnDefs: [
            {
              targets: 0,
              render: function (data,type, full, meta) {
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<input type="text" disabled value="'+ data +'"  class="form-control bakcground-none editar-nome'+full.manuntencao_id+'"'+
                  'name="nome" placeholder="nome" />'+
                  '</div>'
                );
              },
            },
            {
              targets: 1,
              render: function (data, type, full, meta) {
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<select disabled class="select2 form-control bakcground-none veiculo veiculo'+full.manuntencao_id+'"name="veiculo">'+
                  '<option selected >'+full.veiculo_nome+'</option>'+
                  '</select>'+
                  '</div>'
                )
              },
            },
            {
              targets: 2,
              render: function (datas, type, full, meta) {
                const data = new Date(datas);
                dia  = data.getDate().toString(),
                diaF = (dia.length == 1) ? '0'+dia : dia,
                mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                mesF = (mes.length == 1) ? '0'+mes : mes,
                anoF = data.getFullYear();
                return(
                  '<div class="d-flex align-items-center col-actions">' +
                  '<input disabled type="date" class="form-control bakcground-none data'+full.manuntencao_id+'" value="'+anoF+"-"+mesF +"-"+diaF+'" placeholder="00/00/0000"'+
                  'name="data" />'+
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
                  '<a class="mr-1 d-none d-none'+full.manuntencao_id+'" data-id='+full.manuntencao_id+' data-toggle="tooltip" data-placement="top" title="Editar">' +
                  feather.icons['save'].toSvg({ class: 'font-medium-2 text-success'  }) +
                  '</a>' +
                  '<a class="mr-1 editar" data-id='+full.manuntencao_id+' data-toggle="tooltip" data-placement="top" title="Editar">' +
                  feather.icons['edit'].toSvg({ class: 'font-medium-2 text-warning' }) +
                  '</a>' +
                  '<a class="mr-1 deletar" data-id='+full.manuntencao_id+'' +
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
      dados.push({ id: data[key].veiculo_id, text: data[key].veiculo_nome });
    }
    return dados
  }



  function buscaVeiculo(objeto) {
    $(objeto).html('');
    $.ajax({
      url: '/api/buscar/veiculo',
      method: 'GET',
      data:{usuarioId},
    }).done(function (data) {
      $(objeto).select2({
        data: formatarDadosSelect2(data),
      });
    });
  }


  $('body').on('click', '.editar', function(){
    objetoClicado = $(this)
    idClicado = $(objetoClicado).data('id')

    //abilita os inputs para edição
    $(`.d-none${idClicado}`).removeClass('d-none')
    $(`.editar-nome${idClicado}`).prop("disabled", false);
    $(`.editar-nome${idClicado}`).focus()
    $(`.veiculo${idClicado}`).prop("disabled", false);
    $(`.data${idClicado}`).prop("disabled", false);

    // preenche o select de veiculo
    buscaVeiculo(`.veiculo${idClicado}`)
    $(objetoClicado).addClass('d-none')

    //funcao que edita ao clicar no disquete
    $('body').on('click' ,`.d-none${idClicado}`, function(){
      editarVeiculo(idClicado,
          $(`.editar-nome${idClicado}`).val(), 
          $(`.veiculo${idClicado}`).val(),
          $(`.data${idClicado}`).val(),
        )
      $(`.d-none${idClicado}`).addClass('d-none')
      $(objetoClicado).removeClass('d-none')
      $(`.editar-nome${idClicado}`).prop("disabled", true);
      $(`.veiculo${idClicado}`).prop("disabled", true);
      $(`.data${idClicado}`).prop("disabled", true);
    })
   
  })

  function editarVeiculo(editaManuntecaoId, descricao, veiculo, data ){
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
          url: '/api/editar/manutencao',
          method: 'PUT',
          data:{
            'manutencaoId': editaManuntecaoId,
              'descricao': descricao,
              'veiculo_id': veiculo,
              'data_agendamento': data,
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
        }).fail(function(data){

          var html = '';
          var datas = data.responseJSON
          for (const key in datas) {
            html += `${datas[key]} `
          }
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: html,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          }).then(function(){
            //abilita os inputs para edição
            $(`.d-none${idClicado}`).removeClass('d-none')
            $(`.editar-nome${idClicado}`).prop("disabled", false);
            $(`.editar-nome${idClicado}`).focus()
            $(`.veiculo${idClicado}`).prop("disabled", false);
            $(`.data${idClicado}`).prop("disabled", false);
            $(`.editar-nome${idClicado}`).focus();
          });
        });;;
        
      }
    });
  }

  $('body').on('click', '.deletar',  function(){
    deletarManutencao($(this).data('id'))
  })

  function deletarManutencao(deletarManutencaoId){
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
          url: '/api/deletar/manutencao',
          method: 'DELETE',
          data:{'manutencaoId':deletarManutencaoId},
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
