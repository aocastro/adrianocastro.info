$(document).ready(function() {

    $('#table-users').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Visualizar usuário</h4>')

        let idUsers = `idUsers=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: true,
            data: idUsers,
            url: 'src/users/model/view-users.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/users/view/form-users.html', function() {
                        $('#nameUsers').val(dado.dados.nameUsers)
                        $('#loginUsers').val(dado.dados.loginUsers)
                        $('#passwordUsers').val(dado.dados.passwordUsers)
                    })

                    $('.btn-save').removeAttr('data-operation')
                    $('.btn-save').show()
                    $('#modal-users').modal('show')
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