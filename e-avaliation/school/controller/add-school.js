$('form#add-school').submit(function(e) {
    e.preventDefault()
    var url = 'school/model/add-school.php'
    var formData = new FormData(this)
    $('#new').empty()
    $('#new').append('<h4 class="mdi mdi-loading mdi-spin text-center text-danger"> Aguarde processando requisição...</h4>')

    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        mimeType: "multipart/form-data",
        dataType: 'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(dados) {
            if (dados.mensagem == true) {
                let sucesso = `
                <div class="offset-md-4 col-md-4 col-12 mt-3 mb-3">
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Cadastro efetuado com sucesso!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                `
                $('#new').empty()
                $('#new').append(sucesso)

                $('#list-school').empty()

                $.ajax({
                    dataType: 'json',
                    type: 'post',
                    assync: true,
                    url: 'school/model/list-school.php',
                    success: function(dados) {
                        for (var i = 0; i < dados.length; i++) {
                            let school = `
                            <div class="col-md-3 col-12">
                                <div class="card">
                                    <img class="card-img-top" src="school/model/img/${dados[i].imageSchool}" alt="${dados[i].nameSchool}">
                                    <div class="card-body">
                                        <h5 class="card-title">${dados[i].nameSchool}</h5>
                                        <button class="btn btn-info btn-block btn-sm btn-view"><i class="mdi mdi-eye-circle"></i> Visualizar</button>
                                        <button class="btn btn-primary btn-block btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i> Editar</button>
                                        <button class="btn btn-danger btn-block btn-sm btn-delete"><i class="mdi mdi-delete-circle"></i> Excluir</button>
                                    </div>
                                </div>
                            </div>
                            `
                            $('#list-school').append(school)
                        }
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
                $('#new').empty()
                $('#new').append(erro)
            }
        }
    })
})