function loadServices(idServices) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        async: true,
        data: idServices,
        url: 'src/services/model/view-services.php',
        success: function(dados) {
            for (const result of dados) {
                if (idServices == result.idServices) {
                    $('#AGUAVIVA_SERVICES_idServices').append(`<option value="${result.idServies}" selected>${result.nameServices}</option>`)
                } else {
                    $('#AGUAVIVA_SERVICES_idServices').append(`<option value="${result.idServies}">${result.nameServices}</option>`)
                }
            }
        }
    })
}

$(document).ready(function() {

    $('#table-students').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Nesta próximas duas linhas será limpo os campos das classes selecionadas para posteiormente elas serem preenchidas de acordo com a necessidade
        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('<h4 class="text-danger">Editar cadastro de aluno</h4>')

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
                        $('#sexStudents').val(dado.dados.sexStudents)
                        $('#addressStudents').val(dado.dados.addressStudents)
                        $('#cityStudents').val(dado.dados.cityStudents)
                        $('#birthStudents').val(dado.dados.birthStudents)
                        $('#phoneStudents').val(dado.dados.phoneStudents)
                        $('#celularStudents').val(dado.dados.celularStudents)
                        $('#emailStudents').val(dado.dados.emailStudents)
                        $('#AGUAVIVA_SERVICES_idServices').empty()
                        idServices = dado.dados.AGUAVIVA_SERVICES_idServices
                        $('#paydayStudents').val(dado.dados.paydayStudents)
                        $('#observationStudents').val(dado.dados.observationStudents)
                        $('#idStudents').val(dado.dados.idStudents)
                    })

                    loadServices(idServices)
                    $('.btn-save').removeAttr('data-operation')
                    $('.btn-save').show()
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