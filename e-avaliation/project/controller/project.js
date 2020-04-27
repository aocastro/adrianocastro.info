var pagina = 1
var itensPorPagina = 3

function obterTotalRegistros() {
    var totalRegistros = 0;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'project/model/total-project.php',
        async: false,
        success: function(dado) {
            totalRegistros = dado[0].TOTAL
        }
    })
    return totalRegistros
}

function adicionarItensPaginacao() {
    let totalRegistros = obterTotalRegistros()
    let numeroDePaginas = Math.ceil(totalRegistros / itensPorPagina)
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

    $('#list-project').empty()

    let dado = { pagination: `{"pagina":${pagina},"porpagina":${itensPorPagina}}` }

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: true,
        url: 'project/model/list-project.php',
        data: dado,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let project = `
                <div class="col-md-3 col-12 mt-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center"><strong>${dados[i].nameProject}</strong></h5>
                            <button id="${dados[i].idProject}" class="btn btn-info btn-block btn-sm btn-view"><i class="mdi mdi-eye-circle"></i> Visualizar</button>
                            <button id="${dados[i].idProject}" class="btn btn-primary btn-block btn-sm btn-edit"><i class="mdi mdi-pencil-circle"></i> Editar</button>
                            <button id="${dados[i].idProject}" class="btn btn-danger btn-block btn-sm btn-assoc"><i class="mdi mdi-plus-circle"></i> Associar Alunos</button>
                        </div>
                    </div>
                </div>
                `
                $('#list-project').append(project)
            }
            $('body').append('<script src="project/controller/view-project.js"></script>')
            $('body').append('<script src="project/controller/edit-project.js"></script>')
            $('body').append('<script src="project/controller/project-student.js"></script>')

            $('.btn-assoc').click(function(e) {
                e.preventDefault()
                $('#adm-view').load('project/view/project-student.html')
            })

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
        <form id="add-project">
            <div class="form-group">
                <label><strong>Nome do Projeto</strong></label>
                <input type="text" name="nameProject" class="form-control input-lg">
            </div>
            <div class="form-group">
                <label><strong>Resumo</strong></label>
                <textarea name="resumeProject" class="form-control" cols="30" rows="3"></textarea>
            </div>
            <button class="btn btn-avaliation btn-block btn-lg btn-save"><i class="mdi mdi-content-save-settings"></i> Salvar</button>
        </form>
    </div>
    `

    $('#new').empty()
    $('#new').append(add)
    $('#new').fadeIn(1500)
    $('body').append('<script src="project/controller/add-project.js"></script>')
})

$('.btn-menu').click(function() {
    $('#system').load('system/view/system.html')
})