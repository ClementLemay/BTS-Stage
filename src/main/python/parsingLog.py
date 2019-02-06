import sys
from RequestDB import *
pressed = ""
global pressed

def parserTemp(string, packet):
	stringValue = string[-4:-1]
	stringDesc = "Temperature"

	floatTemp = float(stringValue)*0.147
	floatTemp = round(floatTemp,2)

	parsedPacket = str(packet)[0:11]
	if(parsedPacket!="FF:88:7D:00"):
		requestTemp(floatTemp, stringDesc, parsedPacket, pressed)

def parserDoor(string, packet):
        floatValue = float(string[-2:-1])
	stringDesc = string[-40:-33]
        parsedPacket = str(packet)[0:11]
	requestTemp(floatValue, stringDesc, parsedPacket, pressed)

def parserButton(string, packet):
	parsedPacket = str(packet)[0:11]
	stringDesc = string[18:27]
	floatValue = string[96:97]
	pressed = string[115:123]
	if (pressed == "released"):
		pressed = "false"
	requestTemp(floatValue, stringDesc, parsedPacket, pressed)

