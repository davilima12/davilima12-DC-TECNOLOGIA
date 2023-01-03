$(function () {

  carregarTabela();
  function carregarTabela() {
    $.ajax({
      url: '/api/manutencao',
      data:{usuarioId},
      method: 'GET',
    }).done(function (data) {
      var dt_ajax_table = $('.datatables-manutencao');
      if (dt_ajax_table.length) {
        var dt_ajax = dt_ajax_table.dataTable({
          data: data,
          "destroy": true,
          order: [[1, 'desc']],
          columns: [
            { data: 'descricao' },
            { data: 'veiculo_nome' }, 
            { data: 'nome_usuario' },
            { data: 'marca_nome' },
            { data: 'modelo_nome' },
            { data: 'versoes_nome' },
            { data: 'data_agendamento' }, 
          ],

          columnDefs:[
            {
              targets: -1,
              render: function (data) {
                const novaData = new Date(data);
                console.log(novaData)
                return novaData.toLocaleDateString();
              },
            },
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

});
