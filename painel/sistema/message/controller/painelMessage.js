$(document).ready(function () {
    $('tbody').empty()

    var url = '../../message/model/listarMessage.php'

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: url,
        async: true,
        success: function (dados) {
            for (var i = 0; i < dados.length; i++) {
                let Message = `
                <tr>
                    <td scope="row">`+ dados[i].dateMessage + `</td>
                    <td>`+ dados[i].titleMessage + `</td>
                    <td>` + dados[i].statusMessage + `</td>
                    <td>` + dados[i].typeMessage + `</td>
                    <td>
                        <button id="`+ dados[i].idMessage + `" class="btn btn-outline-primary btn-sm viewMessage"><i class="fas fa-eye"></i></button>
                        <button id="`+ dados[i].idMessage + `" class="btn btn-outline-warning btn-sm editMessage"><i class="fas fa-user-edit"></i></button>
                        <button id="`+ dados[i].idMessage + `" class="btn btn-outline-danger btn-sm delMessage"><i class="fas fa-trash-alt"></i></button>
                    </td>
                </tr>
                `
                $('tbody').append(Message)
            }
            // $('body').append('<script src="../../curso/controller/verCurso.js"></script>')
            // $('body').append('<script src="../../curso/controller/editarCurso.js"></script>')
            // $('body').append('<script src="../../curso/controller/excluirCurso.js"></script>')
        }
    })
})