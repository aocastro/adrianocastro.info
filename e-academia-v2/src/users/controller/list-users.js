$(document).ready(function() {
    $('#table-users').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/users/model/list-users.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/dataTables.brazil.json"
        },
        "columns": [{
                "data": 'idUsers',
                "className": 'text-center'
            },
            {
                "data": 'nameUsers',
                "className": 'text-center'
            },
            {
                "data": 'loginUsers',
                "className": 'text-center'
            },
            {
                "data": 'idUsers',
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