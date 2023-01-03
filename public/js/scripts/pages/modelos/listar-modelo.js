$(function () {
  carregarTabela();
  function carregarTabela() {
    $.ajax({
      url: '/api/buscar/modelos',
      method: 'GET',
    }).done(function (data) {
      var dt_ajax_table = $('.datatables-modelo');
      if (dt_ajax_table.length) {
        var dt_ajax = dt_ajax_table.dataTable({
          data: data,
          "destroy": true,
          order: [[1, 'desc']],
          columns: [
              { data: 'nome' },
              { data: 'created_at' },
              { data: '' }
            ],
          columnDefs: [
            {
              targets: 0,
              render: function (data,type, full, meta) {
                let nome = data
                return (
                  '<div class="d-flex align-items-center col-actions">' +
                  '<input type="text" disabled value="'+ nome +'"  class="form-control bakcground-none editar-save'+full.id+'"'+
                  'name="nome" placeholder="nome" />'+
                  '</div>'
                );
              },
            },
            {
              targets: 1,
              render: function (datas) {
                const data = new Date(datas);
                dia  = data.getDate().toString(),
                diaF = (dia.length == 1) ? '0'+dia : dia,
                mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                mesF = (mes.length == 1) ? '0'+mes : mes,
                anoF = data.getFullYear();
                return diaF+"/"+mesF+"/"+anoF;
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
                  '<a class="mr-1 d-none d-none'+full.id+'" data-id='+full.id+' data-toggle="tooltip" data-placement="top" title="Editar">' +
                  feather.icons['save'].toSvg({ class: 'font-medium-2 text-success'  }) +
                  '</a>' +
                  '<a class="mr-1 editar" data-id='+full.id+' data-toggle="tooltip" data-placement="top" title="Editar">' +
                  feather.icons['edit'].toSvg({ class: 'font-medium-2 text-warning'  }) +
                  '</a>' +
                  '<a class="mr-1 deletar" data-id='+full.id+'  ' +
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


  $('body').on('click', '.editar', function(){
    let objetoClicado = $(this)
    $(objetoClicado).addClass('d-none')
    let idClicado = $(objetoClicado).data('id')
    $(`.d-none${idClicado}`).removeClass('d-none')
    $(`.editar-save${idClicado}`).prop("disabled", false);
    $(`.editar-save${idClicado}`).focus()
    $('body').on('click' ,`.d-none${idClicado}`, function(){
      editarModelo(idClicado, $(`.editar-save${idClicado}`).val())
      $(`.d-none${idClicado}`).addClass('d-none')
      $(objetoClicado).removeClass('d-none')
      $(`.editar-save${idClicado}`).prop("disabled", true);
    })
   
  })

  function editarModelo(editarModeloId, nome){
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
          url: '/api/editar/modelos',
          method: 'PUT',
          data:{
            'modeloId': editarModeloId,
            'nome': nome
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
          });
        });;
        
      }
    });
  }

  $('body').on('click', '.deletar',  function(){
    deletarModelo($(this).data('id'))
  })

  function deletarModelo(deletarModeloId){
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
          url: '/api/deletar/modelos',
          method: 'DELETE',
          data:{'modeloId':deletarModeloId},
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
        }).fail(function(data){
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: data.responseJSON,
            customClass: {
              confirmButton: 'btn btn-success'
            }
          });
        });
      }
    });
  }
});
