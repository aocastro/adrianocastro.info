$(document).ready(function() {
    $('.btn-edit').click(function(e) {
        e.preventDefault()
        var dados = 'idStudents='
        dados += $(this).attr('id')
        $('#modal-title').empty()
        $('#modal-body').empty()

        $.ajax({
            url: 'students/model/list-students.php',
            type: "POST",
            data: dados,
            dataType: 'json',
            assync: false,
            success: function(dados) {
                for (var i = 0; i < dados.length; i++) {
                    let sexo
                    if (dados[i].sexStudents == 1) {
                        sexo = 'Masculino'
                    } else {
                        sexo = 'Feminino'
                    }
                    let form = `
                    <form id="update-students">
                        <div class="form-group row">
                            <div class="col-md-9 col-12">
                                <label>Nome completo</label>
                                <input type="text" name="nameStudents" class="form-control" value="${dados[i].nameStudents}">
                            </div>
                            <div class="col-md-3 col-12">
                                <label>Sexo</label>
                                <select name="sexStudents" class="form-control" required>
                                    <option value="${dados[i].sexStudents}">${sexo}</option>
                                    <option value="1">Masculino</option>
                                    <option value="1">Feminino</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Endereço completo</label>
                            <input type="text" name="addressStudents" class="form-control" value="${dados[i].addressStudents}">
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6 col-12">
                                <label>Cidade</label>
                                <input type="text" name="cityStudents" class="form-control" value="${dados[i].cityStudents}">
                            </div>
                            <div class="col-md-6 col-12">
                                <label>Data de Nascimento</label>
                                <input type="date" name="birthStudents" class="form-control" value="${dados[i].birthStudents}">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-md-6 col-12">
                                <label>Telefone</label>
                                <input type="tel" name="phoneStudents" id="phone" value="${dados[i].phoneStudents}" data-mask="(00) 0000-0000" class="form-control">
                            </div>
                            <div class="col-md-6 col-12">
                                <label>Celular</label>
                                <input type="tel" name="celularStudents" id="celular" value="${dados[i].celularStudents}" data-mask="(00) 00000-0000" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>E-mail</label>
                            <input type="email" name="emailStudents" value="${dados[i].emailStudents}" class="form-control">
                        </div>
                        <div class="form-group row">
                            <div class="col-md-9 col-12">
                                <label>Tipo de serviços</label>
                                <select name="AGUAVIVA_SERVICES_idServices" id="services" class="form-control">
                                    <option value="${dados[i].idServices}">${dados[i].nameServices}</option>
                                </select>
                            </div>
                            <div class="col-md-3 col-12">
                                <label>Dia de vencimento</label>
                                <input type="number" name="paydayStudents" value="${dados[i].paydayStudents}" class="form-control">
                            </div>
                        </div>
                        <input type="hidden" name="idStudents" value="${dados[i].idStudents}"/>
                        <div class="form-group row">
                            <div class="offset-md-9 col-md-3 col-12">
                                <button class="btn btn-agua btn-block btn-update"><i class="mdi mdi-content-save"></i> Salvar</button>
                            </div>
                        </div>
                    </form>

                    <script src="libs/jQuery-Mask-Plugin-master/src/jquery.mask.js"></script>
                    `
                    $('#modal-title').append('ATUALIZAÇÃO DE CADASTRO DE ALUNO')
                    $('#modal-body').append(form)
                    $('#modal-students').modal('show')
                }
                $('body').append('<script src="students/controller/update-students.js"></script>')
            }
        })

        let url = 'services/model/list-services.php'

        $.ajax({
            dataType: 'json',
            type: 'post',
            assync: true,
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
    })
})