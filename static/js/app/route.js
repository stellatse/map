$('#add_to').click(function(){
    var my = $('#my_route');
    var current = $('#current_route').html();
    my.append(current);
    
})