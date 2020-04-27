$(".navbar-toggler").click(function() {
    $('.navbar-collapse').fadeToggle('slow');
})

$('.dropdown-item').click(function() {
    $('.navbar-collapse').fadeToggle('slow')
})

$('.add-users').click(function() {
    $('#content').empty()
    $('#content').load('users/view/add-users.html')
})

$('.add-students').click(function() {
    $('#content').empty()
    $('#content').load('students/view/manage-students.html')
})

$('.add-payment').click(function() {
    $('#content').empty()
    $('#content').load('payment/view/manage-payment.html')
})

$('.add-services').click(function() {
    $('#content').empty()
    $('#content').load('services/view/manage-services.html')
})

$('.manage-tuition').click(function() {
    $('#content').empty()
    $('#content').load('tuition/view/manage-tuition.html')
})

$('.rel-tuition').click(function() {
    $('#content').empty()
    $('#content').load('tuition/view/rel-tuition.html')
})