import sys
from RequestDB import *

def parserTemp(string, packet):
	stringValue = string[-4:-1]
	stringDesc = string[54:65]

	floatTemp = float(stringValue)*0.147
	floatTemp = round(floatTemp,2)

	parsedPacket = str(packet)[0:11]
	requestTemp(floatTemp, stringDesc, parsedPacket)

def parserDoor(string, packet):
        floatValue = float(string[-2:-1])
	stringDesc = string[-40:-33]
        parsedPacket = str(packet)[0:11]
	requestTemp(floatValue, stringDesc, parsedPacket)

def parserButton(string, packet):
	parsedPacket = str(packet)[0:11]
	stringDesc = string[18:27]
	floatValue = string[96:97]
	requestTemp(floatValue, stringDesc, parsedPacket)

