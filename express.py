#!/usr/bin/python
# -*- coding: utf-8 -*-
import web
import json
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import func
from model import *
web.config.debug = False
urls = (
    '/', 'index',
    '/create', 'create',
    '/edit/(\d+)', 'edit',
    '/view/(\d+)', 'view',
    '/get_sights', 'get_sights',
    '/get_route', 'get_route',
    '/initial', 'initial_data'

)
def load_sqla(handler):
    web.ctx.orm = scoped_session(sessionmaker(bind=engine))
    try:
        return handler()
    except web.HTTPError:
        web.ctx.orm.commit()
        raise
    except:
        web.ctx.orm.rollback()
        raise
    finally:
        web.ctx.orm.commit()
app = web.application(urls, globals())
app.add_processor(load_sqla)
session = web.session.Session(app, web.session.DiskStore('sessions'))
render = web.template.render('templates/', base='layout', globals={'context': session})
render_plain = web.template.render('templates/')
class index:
    def GET(self):
        return render.index()

class create:
    def POST(self):
        i = web.input()
        ss = web.ctx.orm.query(Sight).filter(Sight.city==i.destination.encode('utf8')).all()
        if ss == []:
            return render.failed('所选城市不存在景点')
        return web.seeother('/edit/1')
        

class edit:
    def GET(self, route):
        r = web.ctx.orm.query(Route).filter(Route.id==route).first()
        route_name = r.route_name
        sights = []
        count = web.ctx.orm.query(Route).count()
        next = 0
        prev = 0
        if int(route) != 1:
            prev = int(route) - 1
        if int(route) != count:
            next = int(route) + 1
        route_spots =  web.ctx.orm.query(RouteSpot).filter(RouteSpot.route_id==route).all()
        for i in route_spots:
            sight = web.ctx.orm.query(Sight).filter(Sight.id==i.sight_id).one()
            sights.append({'sight':sight, 'order':i.sight_order, 'sight_id':i.id})
        ret = {'route_name':route_name, 'count':count, 'current':route, 'next':next, 'prev': prev}
        source = web.ctx.orm.query(Sight).filter(Sight.city==r.city).all()
        return render.edit(sights, ret, source)
    
    def POST(self):
        # init_route = 1
        # routes = web.ctx.orm.query(Route).filter(Route.route_id==init_route).all()
        # sights = []
        # for i in routes:
            # sight = web.ctx.orm.query(Sight).filter(Sight.id==i.sight_id).one()
            # sights.append(sight)
            
        # print sights
         
        return render.edit()

class view:
    def GET(self, route):
        r = web.ctx.orm.query(Route).filter(Route.id==route).first()
        route_name = r.route_name
        sights = []
        route_spots =  web.ctx.orm.query(RouteSpot).filter(RouteSpot.route_id==route).all()
        for i in route_spots:
            sight = web.ctx.orm.query(Sight).filter(Sight.id==i.sight_id).one()
            sights.append({'sight':sight, 'order':i.sight_order})
        ret = {'route_name':route_name, 'route_id':route}
        return render.view(sights, ret)

class get_sights:
    def POST(self):
        ret = []
        sights = web.ctx.orm.query(Sight).all()
        for i in sights:
            ret.append({'id':i.id,'name':i.name, 'latitude':i.latitude, 'longitude':i.longitude})
        return json.dumps(ret)
class get_route:
    def POST(self):
        route = web.input().id
        r = web.ctx.orm.query(Route).filter(Route.id==route).first()
        route_name = r.route_name
        sights = []
        count = web.ctx.orm.query(Route).count()
        next = 0
        prev = 0
        if int(route) != 1:
            prev = int(route) - 1
        if int(route) != count:
            next = int(route) + 1
        route_spots =  web.ctx.orm.query(RouteSpot).filter(RouteSpot.route_id==route).all()
        for i in route_spots:
            sight = web.ctx.orm.query(Sight).filter(Sight.id==i.sight_id).one()
            sights.append({'sight':sight, 'order':i.sight_order, 'sight_id':i.id})
        ret = {'route_name':route_name, 'count':count, 'current':route, 'next':next, 'prev': prev}
        
        return {'ret':ret, 'sights':sights}
        
class initial_data:
    def GET(self):
        s = Sight(name='新天地', address='测试地址', latitude='121.481241', longitude='31.222388', phone='123456', play_time='1小时', price='免费', pic_link='/test.jpg', tag='测试', open_time='测试', brief_description='测试')
        ss1 = Sight(name='大世界', address='测试地址', latitude='121.48567', longitude='31.23389', phone='123456', play_time='1小时', price='免费', pic_link='/test.jpg', tag='测试', open_time='测试', brief_description='测试')
        ss2 = Sight(name='豫园', address='测试地址', latitude='121.498821', longitude='31.233767', phone='123456', play_time='1小时', price='免费', pic_link='/test.jpg', tag='测试', open_time='测试', brief_description='测试')
        ss3 = Sight(name='上海博物馆', address='测试地址', latitude='121.453474', longitude='31.230617', phone='123456', play_time='1小时', price='免费', pic_link='/test.jpg', tag='测试', open_time='测试', brief_description='测试')
        ss4 = Sight(name='静安寺', address='测试地址', latitude='121.453474', longitude='31.230617', phone='123456', play_time='1小时', price='免费', pic_link='/test.jpg', tag='测试', open_time='测试', brief_description='测试')

        web.ctx.orm.add(s)
        web.ctx.orm.add(ss1)
        web.ctx.orm.add(ss2)
        web.ctx.orm.add(ss3)
        web.ctx.orm.add(ss4)
        r1 = Route(route_name='路线1', city='上海')
        r2 = Route(route_name='路线2', city='上海')
        r3 = Route(route_name='路线3', city='上海')
        web.ctx.orm.add(r1)
        web.ctx.orm.add(r2)
        web.ctx.orm.add(r3)
        s11 = RouteSpot(sight_id=1, sight_order=1, route_id=1)
        s12 = RouteSpot(sight_id=2, sight_order=2, route_id=1)
        s13 = RouteSpot(sight_id=3, sight_order=3, route_id=1)
        s14 = RouteSpot(sight_id=4, sight_order=4, route_id=1)
        s15 = RouteSpot(sight_id=5, sight_order=5, route_id=1)
        s16 = RouteSpot(sight_id=3, sight_order=1, route_id=2)
        s17 = RouteSpot(sight_id=2, sight_order=2, route_id=2)
        s18 = RouteSpot(sight_id=1, sight_order=3, route_id=2)
        s19 = RouteSpot(sight_id=5, sight_order=1, route_id=3)
        s20 = RouteSpot(sight_id=4, sight_order=2, route_id=3)
        s21 = RouteSpot(sight_id=2, sight_order=3, route_id=3)
        s22 = RouteSpot(sight_id=3, sight_order=4, route_id=3)
        
        web.ctx.orm.add(s11)
        web.ctx.orm.add(s12)
        web.ctx.orm.add(s13)
        web.ctx.orm.add(s14)
        web.ctx.orm.add(s15)
        web.ctx.orm.add(s16)
        web.ctx.orm.add(s17)
        web.ctx.orm.add(s18)
        web.ctx.orm.add(s19)
        web.ctx.orm.add(s20)
        web.ctx.orm.add(s21)
        web.ctx.orm.add(s22)
        return render.failed("Intial data loaded! Go to index <a href='/'>home</a>")

if __name__ == "__main__":
    app.run()
