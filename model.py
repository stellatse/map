#!/usr/bin/python
# -*- coding: utf-8 -*-
import web
import settings
import hashlib
from datetime import datetime as dt
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text, Float

# Configure database here
engine = create_engine('mysql+mysqldb://user:pwd@localhost/map', echo=True)

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

#Define the sight spot table
class Sight(Base):
    __tablename__ = 'sight'
    id = Column(Integer, primary_key=True)
    name = Column(String(60))
    city = Column(String(60))
    type = Column(String(20))
    address = Column(String(200))
    geo_source = Column(String(40), nullable = False)
    latitude = Column(String(40), nullable = False)
    longitude = Column(String(40), nullable = False)
    phone = Column(String(40))
    play_time = Column(String(40))
    price = Column(String(100))
    pic_link = Column(String(100))
    tag = Column(String(200))
    open_time = Column(String(100))
    brief_description = Column(String(2000))
    hot = Column(Integer)
    
    def __init__(self, name, address, latitude, longitude, phone, play_time, price, pic_link, tag, open_time, brief_description):
        self.name = name
        self.city = '上海'
        self.type = 'sight'
        self.address = address
        self.geo_source = 'Baidu'
        self.latitude = latitude
        self.longitude = longitude
        self.phone = phone
        self.play_time = play_time
        self.price = price
        self.pic_link = pic_link
        self.tag = tag
        self.open_time = open_time
        self.brief_description = brief_description
        self.hot = 0

sight_table = Sight.__table__

# Define the route table
class RouteSpot(Base):
    __tablename__ = 'route_spot'
    id = Column(Integer, primary_key=True)
    sight_id = Column(Integer, ForeignKey("sight.id"))
    sight_order = Column(Integer)
    route_id = Column(Integer, ForeignKey("route.id"))
    note = Column(Text)
    def __init__(self, sight_id, sight_order, route_id):
        self.sight_id = sight_id
        self.sight_order = sight_order
        self.route_id = route_id
routespot_table = RouteSpot.__table__

    
class Route(Base):
    __tablename__ = 'route'
    id = Column(Integer, primary_key=True)
    route_name = Column(String(120), nullable=False)
    city = Column(String(60))
    
    def __init__(self, route_name, city):
        self.route_name = route_name
        self.city = city

route_table = Route.__table__
metadata = Base.metadata

if __name__ == "__main__":
    metadata.create_all(engine)

