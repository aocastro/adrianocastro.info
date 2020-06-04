$(document).ready(function() {

    $('#modal-loading').modal('show')

    function hideLoading() {
        setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
    }

    let url = 'services/model/list-services.php'

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: url,
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
            $('body').append('<script src="services/controller/view-services.js"></script>')
            $('body').append('<script src="services/controller/find-services.js"></script>')
            $('body').append('<script src="services/controller/edit-services.js"></script>')
            $('body').append('<script src="services/controller/delete-services.js"></script>')
            hideLoading()
        }
    })

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('#modal-title').empty()
        $('#modal-body').empty()

        let form = `
            <!-- Formulário de cadastro de serviços -->
            <form id="add-services">
                <div class="form-group">
                    <labe>Nome do serviços a ser prestado</label>
                        <input type="text" name="nameServices" class="form-control">
                </div>
                <div class="form-group">
                    <labe>Valor do serviço</label>
                        <input type="number" name="valueServices" class="form-control col-2">
                </div>
                <div class="form-group row">
                    <div class="offset-md-8 col-md-4 col-12">
                        <button class="btn btn-agua btn-block btn-add"><i class="mdi mdi-content-save"></i> Salvar</button>
                    </div>
                </div>
            </form>
        `

        $('#modal-title').append('CADASTRO DE SERVIÇOS')
        $('#modal-body').append(form)
        $('#modal-services').modal('show')

        $('body').append('<script src="services/controller/add-services.js"></script>')
    })




})