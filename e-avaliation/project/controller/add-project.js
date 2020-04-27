$('.btn-save').click(function(e) {
    e.preventDefault()
    var dados = $('#add-project').serialize()
    var url = 'project/model/add-project.php'
    $('#new').empty()
    $('#new').append('<h4 class="mdi mdi-loading mdi-spin text-center text-danger"> Aguarde processando requisição...</h4>')
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
                        <strong>Cadastro efetuado com sucesso!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                `
                $('#new').empty()
                $('#new').append(sucesso)
                $('#adm-view').load('project/view/adm-project.html')
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