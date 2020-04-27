function deleteStudent(idProject) {
    $('.btn-delete').click(function() {
        var dados = 'idStudent='
        dados += $(this).attr('id')
        var element = $(this).attr('id')
        url = 'project/model/delete-project-student.php'
        $.ajax({
            dataType: 'json',
            type: 'POST',
            assync: true,
            data: dados,
            url: url,
            success: function(dados) {
                listStudents(idProject)
            }
        })
    })
}

function listStudents(idProject) {
    var dados = 'idProject='
    dados += idProject
    url = 'project/model/list-project-student.php'
    $('#list').empty()
    $.ajax({
        dataType: 'json',
        type: 'POST',
        assync: true,
        data: dados,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let view = `
                        <div class="offset-md-3 col-md-6 col-12 mt-2 mb-2">
                            <button id="${dados[i].idStudent}" data-id="${dados[i].work_project_idProject}" class="btn btn-sm btn-danger btn-block btn-delete"><i class="mdi mdi-delete-circle mdi-24px"></i> ${dados[i].nameStudent}</button>
                        </div>
                        `
                $('#list').append(view)
            }
            deleteStudent(idProject)
        }
    })
}

$.ajax({
    dataType: 'json',
    type: 'post',
    assync: false,
    url: 'student/model/list-student.php',
    success: function(dados) {
        for (var i = 0; i < dados.length; i++) {
            let student = `
            <option value="${dados[i].idStudent}">${dados[i].nameStudent}</option>
            `
            $('#student').append(student)
        }
    }
})

$.ajax({
    dataType: 'json',
    type: 'post',
    assync: false,
    url: 'project/model/list-project.php',
    success: function(dados) {
        for (var i = 0; i < dados.length; i++) {
            var idProject = dados[i].idProject
            $('#name').append(dados[i].nameProject)
            $('#project').val(dados[i].idProject)
        }
        listStudents(idProject)
    }
})


$('.btn-save').click(function(e) {
    e.preventDefault()
    var dados = $('#include-student').serialize()
    var url = 'project/model/add-project-student.php'
    $('#response').empty()
    $('#response').append('<h4 class="mdi mdi-loading mdi-spin text-center text-danger"> Aguarde processando requisição...</h4>')
    $.ajax({
        dataType: 'json',
        type: 'POST',
        assync: true,
        url: url,
        data: dados,
        success: function(dados) {
            if (dados.mensagem == true) {
                let sucesso = `
                <div class="offset-md-4 col-md-4 col-12 mt-3 mb-3">
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Aluno incluído com sucesso!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                `
                $('#response').empty()
                $('#response').append(sucesso)

                var dados = 'idProject='
                dados += $('#project').val()
                url = 'project/model/list-project-student.php'
                $('#list').empty()
                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    assync: true,
                    data: dados,
                    url: url,
                    success: function(dados) {
                        for (var i = 0; i < dados.length; i++) {
                            let view = `
                            <div class="offset-md-3 col-md-6 col-12 mt-2 mb-2">
                                <button id="${dados[i].idStudent}" class="btn btn-sm btn-danger btn-block btn-delete"><i class="mdi mdi-delete-circle mdi-24px"></i> ${dados[i].nameStudent}</button>
                            </div>
                            `
                            $('#list').append(view)
                        }
                        deleteStudent()
                    }
                })
            } else {
                let erro = `
                <div class="offset-md-4 col-md-4 col-12  mt-3 mb-3">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>${dados.mensagem}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                `
                $('#response').empty()
                $('#response').append(erro)
            }
        }
    })
})