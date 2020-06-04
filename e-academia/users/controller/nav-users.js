$(document).ready(function() {
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'users/model/nav-users.php',
        success: function(dados) {
            for (var i = 0; dados.length > i; i++) {
                let menu = `
                    <!-- <a class="dropdown-item my-data"><i class="mdi mdi-lock"></i> Meus Dados</a> -->
                    <a class="dropdown-item btn-logout"><i class="mdi mdi-logout-variant"></i> Sair do Sistema</a>
                `
                $('#menu-usuario').append(dados[i].nameUsers)
                $('#menu-usuario-item').append(menu)
            }
            $('body').append('<script src="users/controller/logout.js"></script>')
                // $('body').append("<script>$('.my-data').click(function() { $('#conteudo').load('usuario/visao/edit-usuario.html') })</script>");
        }
    })
})