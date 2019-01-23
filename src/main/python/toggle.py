#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
Example to show automatic UTE Teach-in responses using
http://www.g-media.fr/prise-gigogne-enocean.html

Waits for UTE Teach-ins, sends the response automatically and prints the ID of new device.
'''

import sys
import time
import traceback
import enocean.utils
from enocean.communicators import SerialCommunicator
from enocean.protocol.packet import RadioPacket, UTETeachIn
from enocean.protocol.constants import RORG

try:
    import queue
except ImportError:
    import Queue as queue

try:
	ans= sys.argv[1]
	ans.lower()
except:
	sys.exit("Entrez un argument")

def send_command(destination, output_value):
    global communicator
    communicator.send(
        RadioPacket.create(rorg=RORG.VLD, rorg_func=0x01, rorg_type=0x01, destination=destination, sender=communicator.base_id, command=1, IO=0x1E, OV=output_value)
    )


def turn(destination, value):
    send_command(destination, value)
value = 0
if (ans == "on"):
	value = 1
elif (ans == "off"):
	value = 0
else:
	sys.exit("Erreur rentrer l'argument on ou off s'il vous plait")
communicator = SerialCommunicator()
communicator.start()
print('The Base ID of your module is %s.' % enocean.utils.to_hex_string(communicator.base_id))

#01:98:ED:72->01:96:0C:91
turn([0x01, 0x98, 0xED, 0x72], value)

time.sleep(0.1)

if communicator.is_alive():
    communicator.stop()