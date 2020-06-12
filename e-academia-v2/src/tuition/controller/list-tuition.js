$(document).ready(function() {
    $('#table-tuition').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/tuition/model/list-tuition.php",
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
                "data": 'nameStudents',
                "className": 'text-center'
            },
            {
                "data": 'grossValue'.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                "className": 'text-center'
            },
            {
                "data": 'idTuition',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-receive"><i class="mdi mdi-cash"></i></button>
                    <button id="${data}" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-trash-can"></i></button>
                    `
                }
            }
        ]
    })
})