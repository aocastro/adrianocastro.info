$(document).ready(function () {
    $('.editMessage').click(function (e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()
        $('.modal-footer').empty()

        var url = '../../message/model/viewMessage.php'
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
                       <form name="form" id="form">
                            <div class="form-group">
                                <label for="txtTitulo" style="margin-bottom: -5px;">Título</label>
                                <input id="txtTitulo" class="form-control" type="text" name="titleMessage" value="` + dados[i].titleMessage + `">
                            </div>
                            <div class="form-group">
                                <label for="txtStatus" style="margin-bottom: -5px;">Status</label>
                                <input id="txtStatus" class="form-control" type="text" name="statusMessage" value="` + dados[i].statusMessage + `">
                            </div>
							<div class="form-group">
                                <label for="txtTexto" style="margin-bottom: -5px;">Descrição</label>
                                <textarea rows="5" class="form-control" id="txtTexto" name="textMessage">` + dados[i].textMessage + `</textarea>
                            </div>
                            <input type="hidden" value="`+ dados[i].idMessage + `" class="form-control" name="idMessage">
                        </form>
                        `
                    $('.modal-title').append('<h3 class="modal-title font-weight-bold" id="TituloModal">Editar Mensagem</h3>')
                    $('.modal-body').append(Message)
                    $('.modal-footer').append('<button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>')
                    $('.modal-footer').append('<button type="button" class="btn btn-success btn-salvar" data-dismiss="modal">Salvar</button>')
                }

                $('#modal').modal('show')

                $('.btn-salvar').click(function (e) {
                    e.preventDefault();

                    var url = '../../message/model/editMessage.php';
                    var dados = $('form').serialize();

                    $.ajax({
                        url: url,
                        type: "POST",
                        data: dados,
                        dataType: 'json',
                        success: function (dados) {
                            if (dados.return == true) {
                                $('#modal').modal('hide')
                                $('#painel').load('../../message/view/painelMessage.html')
                            } else {
                                alert('ATENÇÃO: Ocorreu um erro durante a edição da Mensagem, por favor informe a um técnico.')
                                $('#painel').load('../../message/view/painelMessage.html')
                            }
                        }
                    })

                })

            }

        })

    })
})