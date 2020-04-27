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

$('.btn-save').click(function(e) {
    e.preventDefault()
    var dados = $('#add-teacher').serialize()
    var url = 'teacher/model/add-teacher.php'
    $('#new').empty()
    $('#new').append('<h4 class="mdi mdi-loading mdi-spin text-center text-danger"> Aguarde processando requisição...</h4>')
    $.ajax({
        dataType: 'json',
        type: 'POST',
        assync: true,
        url: url,
        data: dados,
        success: function(dados) {
            if (dados.mensagem == true) {
                let sucesso = `
                <div class="offset-md-4 col-md-4 col-12 mt-3 mb-3">
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Cadastro efetuado com sucesso!</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                `
                $('#new').empty()
                $('#new').append(sucesso)

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
            } else {
                let erro = `
                <div class="offset-md-4 col-md-4 col-12  mt-3 mb-3">
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>${dados.mensagem}</strong>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                `
                $('#new').empty()
                $('#new').append(erro)
            }
        }
    })
})