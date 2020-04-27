$(document).ready(function () {
    $('.viewMessage').click(function (e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()
        $('.modal-footer').empty()

        var url = '../../message/model/verMessage.php'
        var dados = 'idMessage='
        dados += $(this).attr('id')

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: dados,
            url: url,
            success: function (dados) {
                for (var i = 0; i < dados.length; i++) {
                    let Message = `
                        <p><b>ID:</b> `+ dados[i].idMessage + `</p>
                        <p><b>Título:</b> `+ dados[i].titleMessage + `</p>
                        <p><b>Data:</b> `+ dados[i].dateMessage + `</p>
                        <p><b>Status:</b> `+ dados[i].statusMessage + `</p>
                        <p><b>Texto:</b> `+ dados[i].textMessage + `</p>
                    `
                    $('.modal-title').append('<h3 class="modal-title font-weight-bold" id="TituloModal">' + dados[i].titleMessage + '</h3>')
                    $('.modal-body').append(Message)
                    $('.modal-footer').append('<button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>')
                }
                $('#modal').modal('show')
            }
        })
    })
})