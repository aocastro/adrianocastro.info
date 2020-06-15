$(document).ready(function() {

    $('#table-provider').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Editar forncedor</h4>')

        let idProvider = `idProvider=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: true,
            data: idProvider,
            url: 'src/provider/model/view-provider.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/provider/view/form-provider.html', function() {
                        $('#nameProvider').val(dado.dados.nameProvider)
                        $('#addressProvider').val(dado.dados.addressProvider)
                        $('#phoneProvider').val(dado.dados.phoneProvider)
                        $('#celularProvider').val(dado.dados.celularProvider)
                        $('#idProvider').val(dado.dados.idProvider)
                    })

                    $('.btn-save').removeAttr('data-operation')
                    $('.btn-save').show()
                    $('#modal-provider').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'e-Academia', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // Tipo de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})