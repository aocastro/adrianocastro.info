$(document).ready(function() {

    var url = 'timeline/model/view-timeline.php'

    $.ajax({
        dataType: 'json',
        type: 'post',
        assync: false,
        url: url,
        success: function(dados) {
            for (var i = 0; i < dados.length; i++) {
                let timeline = `
                <div class="row mt-3">
                    <div class="offset-md-4 col-md-4 col-12">
                        <div class="row p-1">
                            <div class="col-1">
                                <img src="participants/model/img/${dados[i].icon}" class="icon-user">
                            </div>
                            <div class="col-11">
                                <h5 class="text-danger ml-1">${dados[i].login}</h5>
                            </div>
                        </div>
                        <div class="col-12 p-1 mt-1">
                            <img src="timeline/model/img/${dados[i].foto}" class="img-fluid rounded">
                        </div>
                        <div class="col-12 p-1 mb-3 border-bottom">
                            <p class="text-justify">${dados[i].descricao}</p>
                        </div>
                    </div>
                </div>
                `
                $('#timeline').append(timeline)
            }
        }
    })
})