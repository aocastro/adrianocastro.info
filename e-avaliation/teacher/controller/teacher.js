var pagina = 1
var itensPorPagina = 3

function obterTotalRegistros() {
    var totalRegistros = 0;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'teacher/model/total-teacher.php',
        async: false,
        success: function(dado) {
            totalRegistros = dado[0].TOTAL
        }
    })
    return totalRegistros
}

function adicionarItensPaginacao() {
    let totalRegistros = obterTotalRegistros()
    console.log(totalRegistros)
    let numeroDePaginas = Math.ceil(totalRegistros / itensPorPagina)
    console.log(numeroDePaginas)
    let paginaAtual = $('.pagination').attr('paginaatual')

    let navegacao = '';

    let classePrimeiro = paginaAtual == 1 ? 'disabled' : ''

    navegacao += `<li class="page-item ${classePrimeiro}">
                    <a class="page-link" onclick="paginaAnterior()" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>`

    let inicio = paginaAtual > itensPorPagina ? paginaAtual - itensPorPagina + 1 : 1
    let final = paginaAtual > itensPorPagina ? paginaAtual : itensPorPagina < numeroDePaginas ? itensPorPagina : numeroDePaginas

    for (let i = inicio; i <= final; i++) {
        let classeAtivo = i == paginaAtual ? "active" : ""
        navegacao += `<li class="page-item ${classeAtivo}"><a class="page-link" onclick="irParaPagina(${i})">${i}</a></li>`
    }

    let classeUltimo = paginaAtual == numeroDePaginas ? 'disabled' : ''
    navegacao += `<li class="page-item ${classeUltimo}">
                    <a class="page-link" onclick="proximaPagina()" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>`
    $('.pagination').html(navegacao)
}

function irParaPagina(numeroPagina) {
    $('li.active').removeClass('active')
    $('.pagination').attr('paginaatual', `${numeroPagina}`)
    obterDados(numeroPagina, itensPorPagina)
}

function paginaAnterior() {
    let paginaAnterior = Number($('.pagination').attr('paginaatual')) - 1
    irParaPagina(paginaAnterior)
}

function proximaPagina() {
    let proximaPagina = Number($('.pagination').attr('paginaatual')) + 1
    irParaPagina(proximaPagina)
}

function obterDados(pagina, itensPorPagina) {

    $('#list-teacher').empty()

    let dado = { pagination: `{"pagina":${pagina},"porpagina":${itensPorPagina}}` }

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: 'teacher/model/list-teacher.php',
        data: dado,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                var user
                if (dados[i].typeUser == 1) {
                    user = 'Administrador'
                } else {
                    user = 'Avaliador'
                }
                let teacher = `
            <div class="col-md-3 col-12 mt-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center"><strong>${dados[i].nameTeacher}</strong></h5>
                        <p class="card-body text-center">
                            ${dados[i].nameSchool} <br>
                            ${user}
                        </p>
                        <button id="${dados[i].idTeacher}" class="btn btn-info btn-block btn-sm btn-view"><i class="mdi mdi-eye-circle"></i> Visualizar</button>
                        <button id="${dados[i].idTeacher}" class="btn btn-primary btn-block btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i> Editar</button>
                        <button id="${dados[i].idTeacher}" class="btn btn-danger btn-block btn-sm btn-delete"><i class="mdi mdi-delete-circle"></i> Excluir</button>
                    </div>
                </div>
            </div>
            `
                $('#list-teacher').append(teacher)
            }
            $('body').append('<script src="teacher/controller/view-teacher.js"></script>')
            $('body').append('<script src="teacher/controller/edit-teacher.js"></script>')
        }
    })


    adicionarItensPaginacao()
}

(function() {

    obterDados(pagina, itensPorPagina)

})()


$('.btn-add').click(function() {
    let add = `
    <div class="offset-md-3 col-md-6 col-12 mt-2 mb-2">
        <form id="add-teacher">
            <div class="form-group">
                <label><strong>Nome do professor</strong></label>
                <input type="text" name="nameTeacher" class="form-control input-lg">
            </div>
            <div class="form-group">
                <label><strong>Login do professor</strong></label>
                <input type="text" name="loginTeacher" class="form-control input-lg">
            </div>
            <div class="form-group">
                <label><strong>Senha do professor</strong></label>
                <input type="password" name="passwordTeacher" class="form-control input-lg">
            </div>
            <div class="form-group">
                <label><strong>Tipo de Usuário</strong></label>
                <select name="typeUser" class="form-control input-lg">
                    <option value="">Selecione o tipo de acesso...</option>
                    <option value="1">Administrador de sistema</option>
                    <option value="2">Avaliador</option>
                </select>
            </div>
            <div class="form-group">
                <label><strong>Unidade escolar</strong></label>
                <select name="work_school_idSchool" id="school" class="form-control input-lg">
                    <option value="">Selecione a unidade escolar...</option>
                    
                </select>
            </div>
            <button class="btn btn-avaliation btn-block btn-lg btn-save"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
        </form>
    </div>
    `

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: 'school/model/list-school.php',
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let school = `
                <option value="${dados[i].idSchool}">${dados[i].nameSchool}</option>
                `
                $('#school').append(school)
            }
        }
    })

    $('#new').empty()
    $('#new').append(add)
    $('#new').fadeIn(1500)
    $('body').append('<script src="teacher/controller/add-teacher.js"></script>')
})

$('.btn-menu').click(function() {
    $('#system').load('system/view/system.html')
})