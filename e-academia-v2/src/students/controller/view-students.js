function loadServices(idServices) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        async: true,
        data: idServices,
        url: 'src/services/model/view-services.php',
        success: function(dados) {
            $('#AGUAVIVA_SERVICES_idServices').append(`<option value="${dados.dados.idServices}">${dados.dados.nameServices}</option>`)
        }
    })
}

$(document).ready(function() {

    $('#table-students').on('click', 'button.btn-view', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Visualizar cadastro de aluno</h4>')

        let idStudents = `idStudents=${$(this).attr('id')}`

        var idServices

        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: true,
            data: idStudents,
            url: 'src/students/model/view-students.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/students/view/form-students.html', function() {
                        $('#nameStudents').val(dado.dados.nameStudents)
                        $('#nameStudents').attr('readonly', 'true')

                        // Seleção do sexo do input select
                        $('#sexStudents').empty()

                        dado.dados.sexStudents == 1 ? $('#sexStudents').append(`<option>Masculino</option>`) : $('#sexStudents').append(`<option>Feminino</option>`)

                        $('#sexStudents').attr('readonly', 'true')

                        $('#addressStudents').val(dado.dados.addressStudents)
                        $('#addressStudents').attr('readonly', 'true')
                        $('#cityStudents').val(dado.dados.cityStudents)
                        $('#cityStudents').attr('readonly', 'true')
                        $('#birthStudents').val(dado.dados.birthStudents)
                        $('#birthStudents').attr('readonly', 'true')
                        $('#phoneStudents').val(dado.dados.phoneStudents)
                        $('#phoneStudents').attr('readonly', 'true')
                        $('#celularStudents').val(dado.dados.celularStudents)
                        $('#celularStudents').attr('readonly', 'true')
                        $('#emailStudents').val(dado.dados.emailStudents)
                        $('#emailStudents').attr('readonly', 'true')
                        $('#AGUAVIVA_SERVICES_idServices').empty()
                        $('#AGUAVIVA_SERVICES_idServices').attr('readonly', 'true')
                        idServices = `idServices=${dado.dados.AGUAVIVA_SERVICES_idServices}`
                        loadServices(idServices)
                        $('#paydayStudents').val(dado.dados.paydayStudents)
                        $('#paydayStudents').attr('readonly', 'true')
                        $('#observationStudents').val(dado.dados.observationStudents)
                        $('#observationStudents').attr('readonly', 'true')
                    })

                    $('.btn-save').hide()
                    $('#modal-students').modal('show')
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