$('.btn-save-comment').click(function(e) {
    e.preventDefault()
    var dados = $('#save-comment').serialize()
    var url = 'avaliation/model/save-comment.php'
    $.ajax({
        dataType: 'json',
        type: 'POST',
        assync: true,
        url: url,
        data: dados,
        success: function(dados) {
            if (dados.mensagem == true) {
                let sucesso = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Cadastro efetuado com sucesso!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `
                $('#adm-view').load('avaliation/view/adm-avaliation.html')
            } else {
                let erro = `
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>${dados.mensagem}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `
                $('#div-' + id + '').empty()
                $('#div-' + id + '').append(erro)
            }
        }
    })
})