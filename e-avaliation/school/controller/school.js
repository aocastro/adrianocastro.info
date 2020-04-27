$.ajax({
    dataType: 'json',
    type: 'post',
    assync: true,
    url: 'school/model/list-school.php',
    success: function(dados) {
        for (var i = 0; i < dados.length; i++) {
            let school = `
            <div class="col-md-3 col-12 mt-2">
                <div class="card">
                    <img class="img-thumbnail" src="school/model/img/${dados[i].imageSchool}" alt="${dados[i].nameSchool}">
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