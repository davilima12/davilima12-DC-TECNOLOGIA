$(function () {
  carregarTabela();
  function carregarTabela() {
    $.ajax({
      url: '/api/buscar/cargos',
      data: { empresaId: empresaId },
      method: 'GET',
    }).done(function (data) {
      var dt_ajax_table = $('.datatables-cargo');
      if (dt_ajax_table.length) {
        var dt_ajax = dt_ajax_table.dataTable({
          data: data,
          order: [[1, 'desc']],
          columns: [{ data: 'nome' }, { data: 'created_at' }],
          columnDefs: [
            {
              targets: 1,
              render: function (data) {
                const novaData = new Date(data);
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
