$(document).ready(function() {

    $('#table-services').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Editar serviço</h4>')

        let idServices = `idServices=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: true,
            data: idServices,
            url: 'src/services/model/view-services.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/services/view/form-services.html', function() {
                        $('#nameServices').val(dado.dados.nameServices)
                        $('#valueServices').val(dado.dados.valueServices)
                        $('#idServices').val(dado.dados.idServices)
                    })

                    $('.btn-save').show()
                    $('#modal-services').modal('show')
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