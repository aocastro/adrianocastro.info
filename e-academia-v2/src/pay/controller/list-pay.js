$(document).ready(function() {
    $('#table-pay').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/pay/model/list-pay.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/dataTables.brazil.json"
        },
        "columns": [{
                "data": 'vencimento',
                "className": 'text-center'
            },
            {
                "data": 'nameProvider',
                "className": 'text-center'
            },
            {
                "data": 'valuePay',
                "className": 'text-center'
            },
            {
                "data": 'status',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    var situacao
                    data == 1 ? situacao = 'ABERTO' : situacao = 'PAGO'
                    return `
                    <strong class="text-danger">${situacao}</strong>
                    `
                }
            },
            {
                "data": 'idPay',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye"></i></button>
                    <button id="${data}" class="btn btn-warning btn-sm btn-pay"><i class="mdi mdi-cash-marker"></i></button>
                    <button id="${data}" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-trash-can"></i></button>
                    `
                }
            }
        ]
    })
})