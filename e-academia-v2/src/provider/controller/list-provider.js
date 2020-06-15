$(document).ready(function() {
    $('#table-provider').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/provider/model/list-provider.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/dataTables.brazil.json"
        },
        "columns": [{
                "data": 'nameProvider',
                "className": 'text-center'
            },
            {
                "data": 'phoneProvider',
                "className": 'text-center'
            },
            {
                "data": 'celularProvider',
                "className": 'text-center'
            },
            {
                "data": 'idProvider',
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