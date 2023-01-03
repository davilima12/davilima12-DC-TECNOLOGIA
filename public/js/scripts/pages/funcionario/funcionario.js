$(function () {
  carregarTabela();
  function carregarTabela() {
    $.ajax({
      url: '/api/buscar/funcionario',
      data: { empresaId: empresaId },
      method: 'GET',
    }).done(function (data) {
      var dt_ajax_table = $('.datatables-funcionario');
      if (dt_ajax_table.length) {
        var dt_ajax = dt_ajax_table.dataTable({
          data: data,
          order: [[5, 'desc']],
          columns: [
            { data: 'funcionario_nome' },
            { data: 'cpf' },
            { data: 'idade' },
            { data: 'salario' },
            { data: 'cargo_nome' },
            { data: 'data_funcionario' },
          ],
          columnDefs: [
            {
              targets: 1,
              render: function (data) {
                var cpf = data;
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
                cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                return cpf;
              },
            },
            {
              targets: 3,
              render: function (data) {
                return Number(data).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                });
              },
            },
            {
              targets: 5,
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
