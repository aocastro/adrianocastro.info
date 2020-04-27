$(document).ready(function () {
    $('.delMessage').click(function (e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()
        $('.modal-footer').empty()

        var url = '../../message/model/delMessage.js'
        var dados = 'idMessage='
        dados += $(this).attr('id')

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            data: dados,
            success: function (dados) {
                for (var i = 0; i < dados.length; i++) {
                    let Message = `
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                    <button type="button" id="` + dados[i].idMessage + `" class="btn btn-success btn-excluir" data-dismiss="modal">Excluir</button>
                    `
                    $('.modal-title').append('<h3 class="modal-title font-weight-bold" id="TituloModal">Excluir Curso</h3>')
                    $('.modal-body').append('<p class="p-3">Deseja realmente excluir a Mensagem: <b>' + dados[i].titleMessage + '</b> (id = <b>' + dados[i].idMessage + '</b>)?</p>')
                    $('.modal-footer').append(Message)
                }
                $('#modal').modal('show')
            }
        })
    })
    $('.btn-excluir').click(function (e) {
        e.preventDefault()

        var url = '../../message/model/delMessage.php'
        var dados = 'idMessage='
        dados += $(this).attr('id')

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            async: true,
            data: dados,
            success: function (dados) {
                if (dados.return == true) {
                    $('#modal').modal('hide')
                    function atualizar(){
                        $('#painel').load('../../message/view/painelMessage.html')
                    }
                    setTimeout(atualizar, 500)
                } else {
                    $('#modal').modal('hide')
                    alert('ATENÇÃO: Ocorreu um erro durante a exclusão da Mensagem, por favor informe a um técnico.')
                    $('#painel').load('../../message/view/painelMessage.html')
                }
            }
        })
    })
})