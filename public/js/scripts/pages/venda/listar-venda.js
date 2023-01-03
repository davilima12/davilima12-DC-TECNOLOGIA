$(function () {

  carregarTabela();
  function carregarTabela() {
    $.ajax({
      url: '/api/buscar/vendas',
      data:{usuarioId},
      method: 'GET',
    }).done(function (data) {
      console.log(data)
      var dt_ajax_table = $('.datatables-venda');
      if (dt_ajax_table.length) {
        var dt_ajax = dt_ajax_table.dataTable({
          data: data,
          "destroy": true,
          order: [[1, 'desc']],
          columns: [
            { data: 'valor_total' }, 
            { data: 'quantidade_parcelas' },
            { data: 'forma_pagamento' },
            { data: 'usuario' },
            { data: 'cliente' },
            { data: '' },
          ],
          columnDefs: [
            {
              targets: 0,
              render: function (data,type, full, meta) {
                return 'R$ '+data.toLocaleString();
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


  $('body').on('click', '.deletar',  function(){
    deletarVenda($(this).data('id'))
  })

  function deletarVenda(deletarVendaId){
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
          url: '/api/deletar/venda',
          method: 'DELETE',
          data:{'vendaId':deletarVendaId},
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
