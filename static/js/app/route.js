
$('#add_to').click(function(){
    var my = $('#route_day');
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
function reload_route(route, route_name){
    $('.route_content').html(route);
    $('.route_name').html(route_name)
};
function find_route(route_id){
    var sight = '';
    
    $.post("/get_route",{id:route_id}).done(function (data){
        alert(data);
        ret = JSON.parse(data)
        obj = ret['sights']
        for(var i=0;i<obj.length;i++){
            sight += '<tr><td><img width="90" height="60" style="margin:0px 0px 0px -15px" src="'+obj[i]['sight'][1]+'"></td><td><a>'+obj[i]['sight'][0]+'</a><br/><p style="font-size:11px">建议游玩：'+obj[i]['sight'][2]+'</i></td></tr>'
          }
        reload_route(sight,ret['ret']['route_name']);
    })
}

function add_to_route(sight_id){
    
}