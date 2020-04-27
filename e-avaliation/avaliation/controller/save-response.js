$('.btn-save-response').click(function(e) {
    e.preventDefault()
    var id = $(this).attr('id')
    var dados = $('#save-response-' + id + '').serialize()
    $('#div-' + id + '').fadeOut(1000)
    var url = 'avaliation/model/save-response.php'
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
                $('#div-' + id + '').empty()
                $('#div-' + id + '').append(sucesso)
                $('#div-' + id + '').fadeOut(5000)
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
                $('#div-' + id + '').fadeOut(1500)
            }
        }
    })
})