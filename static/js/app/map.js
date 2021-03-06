//创建和初始化地图函数：
function initMap(){

    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMarker();//向地图中添加marker
}

//创建地图函数：
function createMap(){
    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
    var point = new BMap.Point(121.474926,31.231976);//定义一个中心点坐标
    map.centerAndZoom(point,14);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent(){
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
    //向地图中添加缩放控件
var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
map.addControl(ctrl_nav);
            }

//标注点数组
// var markerArr = [{title:"新天地",content:"我的备注",point:"121.481241|31.222388",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     // ,{title:"大世界",content:"我的备注",point:"121.48567|31.23389",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     // ,{title:"豫园",content:"我的备注",point:"121.498821|31.233767",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     // ,{title:"上海博物馆",content:"我的备注",point:"121.480567|31.235681",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     // ,{title:"静安寺",content:"我的备注",point:"121.453474|31.230617",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
     // ];



//创建marker
function addMarker(){

    for(var i=0;i<markerArr.length;i++){
        var json = markerArr[i];
        var p0 = json.point.split("|")[0];
        var p1 = json.point.split("|")[1];
        var point = new BMap.Point(p0,p1);
        var iconImg = createIcon(json.icon);
        var marker = new BMap.Marker(point,{icon:iconImg});
        var iw = createInfoWindow(i);
        var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
        marker.setLabel(label);
        map.addOverlay(marker);
        label.setStyle({
                    borderColor:"#808080",
                    color:"#333",
                    cursor:"pointer"
        });
        
        (function(){
            var index = i;
            var _iw = createInfoWindow(i);
            var _marker = marker;
            _marker.addEventListener("click",function(){
                this.openInfoWindow(_iw);
            });
            _iw.addEventListener("open",function(){
                _marker.getLabel().hide();
            })
            _iw.addEventListener("close",function(){
                _marker.getLabel().show();
            })
            label.addEventListener("click",function(){
                _marker.openInfoWindow(_iw);
            })
            if(!!json.isOpen){
                label.hide();
                _marker.openInfoWindow(_iw);
            }
        })()
    }
}
//创建InfoWindow
function createInfoWindow(i){
    var json = markerArr[i];
    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
    return iw;
}
//创建一个Icon
function createIcon(json){
    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    return icon;
}
var plPoints = []
lines = []
function addPolyline(){
        for (var i=0;i<lines.length;i++){
        map.removeOverlay(lines[i]);
		}
        for(var i=0;i<plPoints.length;i++){
			var json = plPoints[i];
			var points = [];
			for(var j=0;j<json.points.length;j++){
				var p1 = json.points[j].split("|")[0];
				var p2 = json.points[j].split("|")[1];
				points.push(new BMap.Point(p1,p2));
			}
			var line = new BMap.Polyline(points,{strokeStyle:json.style,strokeWeight:json.weight,strokeColor:json.color,strokeOpacity:json.opacity});
			lines.push(line);
            map.addOverlay(line);
		}
	}

var markerArr = [];
$.ajax({
    url: "/get_sights",
    type: "POST",
}).done(function (data){
    obj = JSON.parse(data)
    for(var i=0;i<obj.length;i++){
        markerArr.push({title:obj[i].name,content:obj[i].id,point:obj[i].latitude + '|' + obj[i].longitude,isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}})
        
      }
    //
    initMap();//创建和初始化地图
    map.removeOverlay(plPoints)
});
function reload_map(){
    initMap();
    
}