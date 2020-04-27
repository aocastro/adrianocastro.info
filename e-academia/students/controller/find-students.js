$(document).ready(function() {

    $('.btn-find').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000)
        }

        var dados = $('#find-students').serialize()
        var url = 'students/model/list-students.php'
        $('#list-students').empty()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: false,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let student = `
                        <div class="row border-top border-primary mt-n-10">
                            <div class="col-md-1 col-12 mt-1">
                                <p class="text-center text-agua">${dados[i].idStudents}</p>
                            </div>
                            <div class="col-md-4 col-12 mt-1">
                                <p class="text-agua text-md-left text-center">${dados[i].nameStudents}</p>
                            </div>
                            <div class="col-md-2 col-12 mt-1">
                                <p class="text-agua text-center">${dados[i].phoneStudents}</p>
                            </div>
                            <div class="col-md-2 col-12 mt-1">
                                <p class="text-agua text-center">${dados[i].celularStudents}</p>
                            </div>
                            <div class="col-md-3 col-12 mt-1">
                                <p class="text-center">
                                <button id="${dados[i].idStudents}" title="Visualizar" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye-outline"></i></button>
                                <button id="${dados[i].idStudents}" title="Editar" class="btn btn-agua btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i></button>
                                <button id="${dados[i].idStudents}" title="Excluir" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-delete-circle"></i></button>
                                </p>
                            </div>
                        </div>
                    `
                    $('#list-students').append(student)
                }
                hideLoading()
                $('body').append('<script src="students/controller/view-students.js"></script>')
                $('body').append('<script src="students/controller/edit-students.js"></script>')
                $('body').append('<script src="students/controller/delete-students.js"></script>')
            }
        })
    })
})