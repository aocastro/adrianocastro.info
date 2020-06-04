$(document).ready(function() {

    $('.btn-find').click(function(e) {
        e.preventDefault()
        $('#modal-loading').modal('show')

        function hideLoading() {
            setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
        }

        var dados = $('#find-services').serialize()
        var url = 'services/model/list-services.php'
        $('#list-services').empty()

        $.ajax({
            url: url,
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: true,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let service = `
                    <div class="row border-top border-primary mt-n-10">
                        <div class="col-md-1 col-12 mt-1">
                            <p class="text-center text-agua">${dados[i].idServices}</p>
                        </div>
                        <div class="col-md-7 col-12 mt-1">
                            <p class="text-agua text-md-left text-center">${dados[i].nameServices}</p>
                        </div>
                        <div class="col-md-1 col-12 mt-1">
                            <p class="text-agua text-center">${dados[i].valueServices}</p>
                        </div>
                        <div class="col-md-3 col-12 mt-1">
                            <p class="text-center">
                            <button id="${dados[i].idServices}" data-toggle="tooltip" data-placement="top" title="Visualizar" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye-outline"></i></button>
                            <button id="${dados[i].idServices}" data-toggle="tooltip" data-placement="top" title="Editar" class="btn btn-agua btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i></button>
                            <button id="${dados[i].idServices}" data-toggle="tooltip" data-placement="top" title="Excluir" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-delete-circle"></i></button>
                            </p>
                        </div>
                    </div>
                    `
                    $('#list-services').append(service)
                }
                hideLoading()
                $('body').append('<script src="services/controller/view-services.js"></script>')
                $('body').append('<script src="services/controller/edit-services.js"></script>')
                $('body').append('<script src="services/controller/delete-services.js"></script>')
            }
        })
    })
})