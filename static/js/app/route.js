
$('#add_to').click(function(){
    var my = $('#route_day');
    var current = $('#current_route').html();
    var markerArr = [];
    reload_user_route(current);
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

function reload_defined_route(sights, route){
    $('.route_content').html(sights);
    $('#route_name').html(route['name']);
    var pager = '';
    if (route['current'] == '1'){
        pager += '<li class="previous disabled"><a href="#" >&larr; 上一个</a>'
    } else {
        pager += '<li class="previous"><a href="javascript:void(0)" onclick="find_route(' + route['prev'] +')">&larr; 上一个</a>'
    }
    pager += '</li>'
    if (route['current'] == route['count']){
        pager += '<li class="next disabled"><a href="#">下一个 &rarr;</a>'
    } else {
        pager += '<li class="next"><a href="javascript:void(0)" onclick="find_route(' + route['next'] + ')">下一个 &rarr;</a>';
    }
    pager += '</li>'
    $('#route_pager').html(pager)
};
function reload_user_route(sights){
    var my = $('#route_day');
    my.append(sights);
}
function find_route(route_id){
    var sight = '';
    
    $.post("/get_route",{id:route_id}).done(function (data){
        ret = JSON.parse(data)
        obj = ret['sights']
        for(var i=0;i<obj.length;i++){
            sight += '<tr><td><img width="90" height="60" style="margin:0px 0px 0px -15px" src="'+obj[i]['sight'][1]+'"></td><td><a>'+obj[i]['sight'][0]+'</a><br/><p style="font-size:11px">建议游玩：'+obj[i]['sight'][2]+'</i></td></tr>'
          }
        reload_defined_route(sight,ret['ret']);
    })
}

function add_to_route(sight_id){
    $.post("/get_sight", {id:sight_id}).done(function (data){
        ret = JSON.parse(data)
        sight = '<tr><td><img width="90" height="60" style="margin:0px 0px 0px -15px" src="'+ret['pic_link']+'"></td><td><a>'+ret['name']+'</a><br/><p style="font-size:11px">建议游玩：'+ret['play_time']+'</i><input type="text" name="sight" value="'+ret['id']+'" style="display:none;"/></td></tr>';
        reload_user_route(sight)
    })
};


function publish_route(route_id){
    var route_name = $('input[name=route_name]').val();
    var city = $('.brand').html();
    alert(city)
    var pub = [];
    var i = 0;
    $('input[name=sight]').each(function(){
        pub.push({'order': i, 'value': $(this).val()});
        i++;
    });
    
    $.post("/publish_route", {id: route_id, name: route_name, route:pub, city:city})
    
}