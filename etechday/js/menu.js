$(function() {
    $('.menu-btn').on('click', function() {
        $('main').toggleClass('toggled')
    })
})

$('.techday').click(function() {
    $('#content').empty()
    $('#content').load('techday.html')
    $('main').toggleClass('toggled')
})

$('.subscript').click(function() {
    $('#content').empty()
    $('#content').load('participants/view/add-participant.html')
    $('main').toggleClass('toggled')
})

$('.restrict').click(function() {
    $('#content').empty()
    $('#content').load('participants/view/restrict-participant.html')
    $('main').toggleClass('toggled')
})

$('.shedule').click(function() {
    $('#content').empty()
    $('#content').load('schedule.html')
    $('main').toggleClass('toggled')
})

$('.selected').click(function() {
    $('#content').empty()
    $('#content').load('participants/view/selected-participant.html')
    $('main').toggleClass('toggled')
})

$('.video').click(function() {
    $('#content').empty()
    $('#content').load('videos.html')
    $('main').toggleClass('toggled')
})

$('.timeline').click(function() {
    $('#content').empty()
    $('#content').load('timeline.html')
    $('main').toggleClass('toggled')
})