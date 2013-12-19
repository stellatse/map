
$('#add_to').click(function(){
    var my = $('#my_route');
    var current = $('#current_route').html();
    var markerArr = [];
    my.append(current);
    $.ajax({
        url: "/get_sights",
        type: "POST",
        
    }).done(function (data){
        obj = JSON.parse(data)
        for(var i=0;i<obj.length;i++){
            markerArr.push({title:obj[i].name,content:obj[i].id,point:obj[i].latitude + '|' + obj[i].longitude,isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}})
            
          }
        reload_map();
    })
    
})