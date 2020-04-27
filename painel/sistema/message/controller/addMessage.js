$(document).ready(function () {

    $('.addMessage').click(function (e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()
        $('.modal-footer').empty()

        let NovaMessage = `
            <form id="add-message" name="add-message" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="txtTitulo" style="margin-bottom: -5px;">Título</label>
                    <input id="txtTitulo" class="form-control" type="text" name="titleMessage">
                </div>
				<div class="form-group">
                    <label for="txtTexto" style="margin-bottom: -5px;">Texto</label>
                    <input id="txtTexto" class="form-control-file" type="file" name="textMessage">
                </div>
            </form>
            `
        $('.modal-title').append('<h3 class="modal-title font-weight-bold" id="TituloModal">Nova Mensagem</h3>')
        $('.modal-body').append(NovaMessage)
        $('.modal-footer').append('<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button><button class="btn btn-success btn-add" data-dismiss="modal">Concluir</button>')
        $('#modal').modal('show')
    })

    $('.btn-add').click(function (e) {
        e.preventDefault()

        var url = '../../message/model/cadastrarMessage.php'
        var message = document.getElementById('add-message');
        var formData = new FormData(message)

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            mimeType: "multipart/form-data",
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function (message) {
                if (message.return == true) {
                    $('#modal').modal('hide')
                    $('#painel').load('../../message/view/painelMessage.html')
                } else {
                    $('#modal').modal('hide')
                    alert('ATENÇÃO: Ocorreu um erro durante o adicionamento de uma nova Mensagem, por favor informe a um técnico.')
                    $('#painel').load('../../message/view/painelMessage.html')
                }
                $('#add-message input').val("")
            }
        })
    })
})