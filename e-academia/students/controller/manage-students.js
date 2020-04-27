$(document).ready(function() {

    $('#modal-loading').modal('show')

    function hideLoading() {
        setTimeout(function() { $('#modal-loading').modal('hide') }, 1000);
    }

    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('#modal-title').empty()
        $('#modal-body').empty()

        let form = `
        <form id="add-students">
            <div class="form-group row">
                <div class="col-md-9 col-12">
                    <label>Nome completo</label>
                    <input type="text" name="nameStudents" class="form-control" required>
                </div>
                <div class="col-md-3 col-12">
                    <label>Sexo</label>
                    <select name="sexStudents" class="form-control" required>
                        <option value="">Selecione...</option>
                        <option value="1">Masculino</option>
                        <option value="1">Feminino</option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-8 col-12">
                    <label>Endereço completo</label>
                    <input type="text" name="addressStudents" class="form-control">
                </div>
                <div class="col-md-4 col-12">
                    <label>Cidade</label>
                    <input type="text" name="cityStudents" class="form-control">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-4 col-12">
                    <label>Data de Nascimento</label>
                    <input type="date" name="birthStudents" class="form-control" required>
                </div>
                <div class="col-md-4 col-12">
                    <label>Telefone</label>
                    <input type="tel" name="phoneStudents" id="phone" placeholder="(00) 0000-0000" data-mask="(00) 0000-0000" class="form-control">
                </div>
                <div class="col-md-4 col-12">
                    <label>Celular</label>
                    <input type="tel" name="celularStudents" id="celular" placeholder="(00) 00000-0000" data-mask="(00) 00000-0000" class="form-control" required>
                </div>
            </div>
            <div class="form-group">
                <label>E-mail</label>
                <input type="email" name="emailStudents" class="form-control">
            </div>
            <div class="form-group row">
                <div class="col-md-9 col-12">
                    <label>Tipo de serviços</label>
                    <select name="AGUAVIVA_SERVICES_idServices" id="services" class="form-control">
                        <option value="">Selecione</option>
                    </select>
                </div>
                <div class="col-md-3 col-12">
                    <label>Dia de vencimento</label>
                    <input type="number" name="paydayStudents" class="form-control" required>
                </div>
            </div>
            <div class="form-group">
                <label>Observações importantes sobre o aluno</label>
                <textarea name="observationStudents" class="form-control"></textarea>
            </div>
            <div class="form-group row">
                <div class="offset-md-9 col-md-3 col-12">
                    <button class="btn btn-agua btn-block btn-add"><i class="mdi mdi-content-save"></i> Salvar</button>
                </div>
            </div>
        </form>

        <script src="libs/jQuery-Mask-Plugin-master/src/jquery.mask.js"></script>
        `

        let url = 'services/model/list-services.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: false,
            url: url,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let services = `
                    <option value="${dados[i].idServices}">${dados[i].nameServices}</option>
                `
                    $('#services').append(services)
                }
            }
        })

        $('#modal-title').append('CADASTRO DE ALUNOS')
        $('#modal-body').append(form)
        $('#modal-students').modal('show')

        $('body').append('<script src="students/controller/add-students.js"></script>')
    })


    let url = 'students/model/list-students.php'

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let student = `
                <div class="row border-top border-primary mt-n-10">
                    <div class="col-md-1 col-12 mt-1">
                        <p class="text-center text-agua">${dados[i].idStudents}</p>
                    </div>
                    <div class="col-md-4 col-12 mt-1">
                        <p class="text-agua text-md-left text-center">${dados[i].nameStudents}</p>
                    </div>
                    <div class="col-md-2 col-12 mt-1">
                        <p class="text-agua text-center">${dados[i].phoneStudents}</p>
                    </div>
                    <div class="col-md-2 col-12 mt-1">
                        <p class="text-agua text-center">${dados[i].celularStudents}</p>
                    </div>
                    <div class="col-md-3 col-12 mt-1">
                        <p class="text-center">
                        <button id="${dados[i].idStudents}" title="Visualizar" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye-outline"></i></button>
                        <button id="${dados[i].idStudents}" title="Editar" class="btn btn-agua btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i></button>
                        <button id="${dados[i].idStudents}" title="Excluir" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-delete-circle"></i></button>
                        </p>
                    </div>
                </div>
                `
                $('#list-students').append(student)
            }
            $('body').append('<script src="students/controller/view-students.js"></script>')
            $('body').append('<script src="students/controller/find-students.js"></script>')
            $('body').append('<script src="students/controller/edit-students.js"></script>')
                // $('body').append('<script src="students/controller/delete-students.js"></script>')
            hideLoading()
        }
    })
})