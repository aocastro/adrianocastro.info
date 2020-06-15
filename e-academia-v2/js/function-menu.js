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

$('.users').click(function() {
    $('#content').empty()
    $('#content').load('src/users/view/list-users.html')
    $('main').toggleClass('toggled')
})

$('.provider').click(function() {
    $('#content').empty()
    $('#content').load('src/provider/view/list-provider.html')
    $('main').toggleClass('toggled')
})

$('.pay').click(function() {
    $('#content').empty()
    $('#content').load('src/pay/view/list-pay.html')
    $('main').toggleClass('toggled')
})

$('.rel-tuition').click(function() {
    $('#content').empty()
    $('#content').load('src/tuition/view/rel-tuition.html')
    $('main').toggleClass('toggled')
})