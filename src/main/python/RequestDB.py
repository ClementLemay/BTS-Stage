import mysql.connector
import time
from datetime import datetime

def requestTemp(value, description,idSensors):
	autoIncrementing=('SELECT * FROM DATA;')
	dateTime = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')
	cnx = mysql.connector.connect(user='root', password='stage',
                              host='127.0.0.1',
                              database='Enocean',
                              use_pure=False)

	cursor = cnx.cursor()
	cursorbuff = cnx.cursor(buffered=True)
	try:
		add_sensors=('insert Into SENSORS Values( %s,%s);')
		cursor.execute(add_sensors,(idSensors,description))
	except:
		print("Champs deja existant")

	cursorbuff.execute(autoIncrementing,)
	id=cursorbuff.rowcount+1
	add_data=('insert Into DATA Values(%s, %s, %s, %s);')
	cursor.execute(add_data,(id,dateTime,value,idSensors))

	cnx.commit()
	cursor.close()
	cnx.close()
	print datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')
