$(document).ready(function() {
    $('#table-payment').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/payment/model/list-payment.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/dataTables.brazil.json"
        },
        "columns": [{
                "data": 'idPayment',
                "className": 'text-center'
            },
            {
                "data": 'namePayment',
                "className": 'text-center'
            },
            {
                "data": 'idPayment',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye"></i></button>
                    <button id="${data}" class="btn btn-primary btn-sm btn-edit"><i class="mdi mdi-pencil"></i></button>
                    <button id="${data}" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-trash-can"></i></button>
                    `
                }
            }
        ]
    })
})