$(document).ready(function () {

    $('tbody').empty()



    var url = '../../archive/model/listArchive.php'



    $.ajax({

        type: 'POST',

        dataType: 'json',

        url: url,

        async: true,

        success: function (dados) {

            for (var i = 0; i < dados.length; i++) {

                let Arc = `

                <tr>

                    <td scope="row">`+ dados[i].idArchive + `</td>

                    <td>`+ dados[i].nameArchive + `</td>

                    <td>` + dados[i].message_idMessage + `</td>

                    <td>

                        <button id="`+ dados[i].idArchive + `" class="btn btn-outline-primary btn-sm btn-dadosCurso"><i class="fas fa-eye"></i></button>

                        <button id="`+ dados[i].idArchive + `" class="btn btn-outline-warning btn-sm btn-editarCurso"><i class="fas fa-user-edit"></i></button>

                        <button id="`+ dados[i].idArchive + `" class="btn btn-outline-danger btn-sm btn-excluirCurso"><i class="fas fa-trash-alt"></i></button>

                    </td>

                </tr>

                `

                $('tbody').append(Cursos)

            }

            $('body').append('<script src="../../curso/controller/verCurso.js"></script>')

            $('body').append('<script src="../../curso/controller/editarCurso.js"></script>')

            $('body').append('<script src="../../curso/controller/excluirCurso.js"></script>')

        }

    })

})