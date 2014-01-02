
1. Install Web.py
cd web.py-0.37
python setup.py install

2. Install SQLAlchemy
easy_install SQLAlchemy

3. Restore database
mysql -h hostname -u username -p password databasename < map.sql

4. Modify the model.py to change the databse host/username/password in line 11
