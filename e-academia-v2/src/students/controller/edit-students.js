function loadServices(idServices) {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        async: true,
        url: 'src/services/model/all-services.php',
        success: function(dados) {
            for (const dado of dados) {
                if (idServices === dado.idServices) {
                    console.log(idServices)
                    $('#AGUAVIVA_SERVICES_idServices').append(`<option value="${dado.idServices}" selected>${dado.nameServices}</option>`)
                } else {
                    $('#AGUAVIVA_SERVICES_idServices').append(`<option value="${dado.idServices}">${dado.nameServices}</option>`)
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
                            // Seleção do sexo do input select
                        $('#sexStudents').empty()

                        switch (dado.dados.sexStudents) {
                            case '1':
                                $('#sexStudents').append(`
                                                        <option value="1" selected>Masculino</option>
                                                        <option value="2">Feminino</option>
                                `)
                                break
                            case '2':
                                $('#sexStudents').append(`
                                                        <option value="1">Masculino</option>
                                                        <option value="2" selected>Feminino</option>
                                `)
                                break
                        }

                        $('#addressStudents').val(dado.dados.addressStudents)
                        $('#cityStudents').val(dado.dados.cityStudents)
                        $('#birthStudents').val(dado.dados.birthStudents)
                        $('#phoneStudents').val(dado.dados.phoneStudents)
                        $('#celularStudents').val(dado.dados.celularStudents)
                        $('#emailStudents').val(dado.dados.emailStudents)
                        $('#AGUAVIVA_SERVICES_idServices').empty()
                        $('#AGUAVIVA_SERVICES_idServices').attr('readonly', 'true')
                        idServices = dado.dados.AGUAVIVA_SERVICES_idServices
                        loadServices(idServices)
                        $('#paydayStudents').val(dado.dados.paydayStudents)
                        $('#observationStudents').val(dado.dados.observationStudents)
                        $('#idStudents').val(dado.dados.idStudents)
                    })

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