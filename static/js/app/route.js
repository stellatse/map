
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
$if ret['current'] == '1':
    <li class="previous disabled"><a href="#" >&larr; 上一个</a>
$else:
    <li class="previous"><a href="javascript:void(0)" onclick="find_route($ret['prev'])">&larr; 上一个</a>
</li>
$if int(ret['current']) == ret['count']:
    <li class="next disabled"><a href="#">下一个 &rarr;</a>
$else:
    <li class="next"><a href="javascript:void(0)" onclick="find_route($ret['next'])">下一个 &rarr;</a>
</li>
function reload_route(sights, route){
    $('.route_content').html(sights);
    $('.route_name').html(route['name']);
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
function find_route(route_id){
    var sight = '';
    
    $.post("/get_route",{id:route_id}).done(function (data){
        alert(data);
        ret = JSON.parse(data)
        obj = ret['sights']
        for(var i=0;i<obj.length;i++){
            sight += '<tr><td><img width="90" height="60" style="margin:0px 0px 0px -15px" src="'+obj[i]['sight'][1]+'"></td><td><a>'+obj[i]['sight'][0]+'</a><br/><p style="font-size:11px">建议游玩：'+obj[i]['sight'][2]+'</i></td></tr>'
          }
        reload_route(sight,ret['ret']);
    })
}

function add_to_route(sight_id){
    
}