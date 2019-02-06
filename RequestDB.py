import mysql.connector
import time

def requestTemp(value, id):
	value = str(value)
	id = str(id)
	dateTime = time.strftime('"%Y-%m-%d"')
	cnx = mysql.connector.connect(user='root', password='stage',
                              host='127.0.0.1',
                              database='Enocean',
                              use_pure=False)

	cursor = cnx.cursor()

	add_data=('insert Into SENSORS Values('+ id +','+ value  +','+ dateTime +');')

	cursor.execute(add_data)

	cnx.commit()
	cursor.close()
	cnx.close()
	print dateTime

requestTemp(25,3)
