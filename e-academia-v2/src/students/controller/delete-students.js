$(document).ready(function() {

    $('#table-students').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let idStudents = `idStudents=${$(this).attr('id')}`

        Swal.fire({
            title: 'e-Academia',
            text: 'Deseja realmente excluir esse registro?',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.value) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    async: true,
                    data: idStudents,
                    url: 'src/students/model/delete-students.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Carros',
                            text: dados.mensagem,
                            type: dados.tipo,
                            confirmButtonText: 'OK'
                        })

                        $('#table-students').DataTable().ajax.reload()
                    }
                })
            }
        })

    })

})