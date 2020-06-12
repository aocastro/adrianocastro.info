$(function() {
    $('.menu-btn').on('click', function() {
        $('main').toggleClass('toggled')
    })
})

$('.services').click(function() {
    $('#content').empty()
    $('#content').load('src/services/view/list-services.html')
    $('main').toggleClass('toggled')
})

$('.payment').click(function() {
    $('#content').empty()
    $('#content').load('src/payment/view/list-payment.html')
    $('main').toggleClass('toggled')
})

$('.students').click(function() {
    $('#content').empty()
    $('#content').load('src/students/view/list-students.html')
    $('main').toggleClass('toggled')
})

$('.tuition').click(function() {
    $('#content').empty()
    $('#content').load('src/tuition/view/list-tuition.html')
    $('main').toggleClass('toggled')
})