$(document).ready(function() {
    $('#table-students').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/students/model/list-students.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/dataTables.brazil.json"
        },
        "columns": [{
                "data": 'idStudents',
                "className": 'text-center'
            },
            {
                "data": 'nameStudents',
                "className": 'text-center'
            },
            {
                "data": 'phoneStudents',
                "className": 'text-center'
            },
            {
                "data": 'celularStudents',
                "className": 'text-center'
            },
            {
                "data": 'idStudents',
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