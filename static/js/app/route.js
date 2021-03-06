
//This function use to add the pre-defined route to user's route
function add_to(route_id){
    var sight = '';
    $.post("/get_route",{id:route_id}).done(function (data){
        ret = JSON.parse(data)
        obj = ret['sights']
        for(var i=0;i<obj.length;i++){
            sight += '<tr><td><img width="90" height="60" style="margin:0px 0px 0px -15px" src="'+obj[i]['sight'][1]+'"></td><td><a>'+obj[i]['sight'][0]+'</a><br/><p style="font-size:11px">建议游玩：'+obj[i]['sight'][2]+'</i><a style="font-size:10px" title="删除" onclick="remove_sight(this);">删除</a></p><input type="text" name="sight" value="'+obj[i]['sight_id']+'" style="display:none;"/></td></tr>';
          }
        reload_user_route(sight, true);
    })
    
    load_route_map(route_id)
    
}

//This function use to ajax load the pre-defined route
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
    $('#route_id').html('<button type="button" class="btn btn-primary" onclick="add_to('+route['current']+')" >添加到我的行程</button>')
    $('#route_pager').html(pager)
    
};

//This function use to ajax load html after add a sight into user's route
function reload_user_route(sights, refresh){
    var my = $('#route_day');
    if (refresh==true){
        my.empty()
    }
    my.append(sights);
    
}

//This function used to switch the pre-defined route
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

//Add the selected sight into user's route
function add_to_route(sight_id){
    $.post("/get_sight", {id:sight_id}).done(function (data){
        ret = JSON.parse(data)
        sight = '<tr><td><img width="90" height="60" style="margin:0px 0px 0px -15px" src="'+ret['pic_link']+'"></td><td><a>'+ret['name']+'</a><br/><p style="font-size:11px">建议游玩：'+ret['play_time']+'</i><a style="font-size:10px" title="删除" onclick="remove_sight(this);">删除</a></p><input type="text" name="sight" value="'+ret['id']+'" style="display:none;"/></td></tr>';
        spot_points.push(ret['latitude'] + '|' + ret['longitude'])
        reload_user_route(sight);
        reload_map_line()
    })
};

//remove the selected sight in user's route
function remove_sight(obj){
    var sight = $(obj).parent().parent().parent();
    sight.remove();
    var i = 1;
    var pub = [];
    $('input[name=sight]').each(function(){
        pub.push({'order': i, 'value':$(this).val()})
        i++;
    });
    $.post("/get_sight_map", {'route':JSON.stringify(pub)}).done(function (data){
        ret = JSON.parse(data)
        spot_points = []
        for(var i=0;i<ret.length;i++){
            spot_points.push(ret[i]['latitude'] + '|' + ret[i]['longitude'])
        }
        reload_map_line()
    })
    
}

//save and publish the user's route, redirect to view route page
function publish_route(route_id){
    var route_name = $('input[name=route_name]').val();
    var city = $('.city').html();
    var pub = [];
    var i = 1;
    $('input[name=sight]').each(function(){
        pub.push({'order': i, 'value':$(this).val()})
        i++;
    });
    $.post("/publish_route", {id: route_id, name: route_name, 'route':JSON.stringify(pub), city:city}).done(function (data){
         ret = JSON.parse(data)
         window.location.href = ret['url'];
    })
    
}

//draw the route line on map
function reload_map_line(){
    plPoints = []
    plPoints.push({style:"solid",weight:4,color:"#f00",opacity:0.6,points:spot_points})      
    addPolyline()
}

//load the route line on map
function load_route_map(route_id){
    $.post("/get_route_map", {id:route_id}).done(function (data){
        obj = JSON.parse(data)
        spot_points = []
        for(var i=0;i<obj.length;i++){
            spot_points.push(obj[i].latitude + '|' + obj[i].longitude)
          }
        reload_map_line()
    });
}

function add_note(id){
    var note = $('')
    $.post("/add_note", {id:id, note:note}).done(function (data){
        
    });
}
