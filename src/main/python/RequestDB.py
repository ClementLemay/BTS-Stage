import mysql.connector
import time
from datetime import datetime

def requestTemp(value, description,address,pressed):
	dateTime = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
	cnx = mysql.connector.connect(user='root', password='stage',
                              host='localhost',
                              database='Enocean',
                              use_pure=False)

	cursor = cnx.cursor()
	cursor2 = cnx.cursor(buffered=True)
	try:
		add_sensors=('insert Into SENSORS (Address,Label) Values (%s,%s);')
		cursor.execute(add_sensors,(address,description))
		cnx.commit()
	except:
		cnx.rollback()
  	cursor2.execute("SELECT Id FROM SENSORS WHERE Address LIKE %s AND Label LIKE %s", (address,description,))
   	idSensors = str(cursor2.fetchone())
	idSensors=idSensors.replace("(", "")
	idSensors=idSensors.replace(",)", "")
	if(pressed ==""):
		add_data=('insert Into DATA (Datetime,Value,IdSensors) Values (%s, %s, %s);')
		cursor.execute(add_data,(dateTime,value,idSensors))
	else:
		requestButton(dateTime,pressed,idSensors)
	cnx.commit()
	cursor.close()
	cnx.close()

def requestButton(dateTime,pressed,idSensors):
	if (pressed != "false"):
        	cnx = mysql.connector.connect(user='root', password='stage',
                              host='localhost',
                              database='Enocean',
                              use_pure=False)
		cursor= cnx.cursor(buffered=True)

		cursor.execute("SELECT DATA.Value FROM DATA INNER JOIN (SELECT IdSensors,Value, MAX(Datetime) AS maxDate FROM DATA GROUP BY IdSensors ) groupel ON DATA.IdSensors = groupel.IdSensors AND DATA.Datetime = groupel.maxDate AND DATA.IdSensors LIKE %s ", (idSensors,))
		value = str(cursor.fetchone())

		add_data=('insert Into DATA (Datetime,Value,IdSensors) Values (%s, %s, %s);')
		if (value == "None" or value == "(0.0,)"):
			cursor.execute(add_data,(dateTime,"1",idSensors))
		else:
			cursor.execute(add_data,(dateTime,"0",idSensors))
		cnx.commit()
