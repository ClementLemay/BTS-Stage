#!/usr/bin/env python
# -*- encoding: utf-8 -*-
from enocean.consolelogger import init_logging
import enocean.utils
from enocean.communicators.serialcommunicator import SerialCommunicator
from enocean.communicators import SerialCommunicator
from enocean.protocol.packet import RadioPacket
from enocean.protocol.packet import Packet
from enocean.protocol.constants import PACKET, RORG
import sys
import traceback

try:
    import queue
except ImportError:
    import Queue as queue

communicator = SerialCommunicator()
communicator.start()
global communicator
destina = [0x05, 0x09, 0xF6, 0x5E]
communicator.send(
RadioPacket.create(rorg=RORG.VLD, rorg_func=0x01, rorg_type=0x01, destination=destina, sender=comunicator.base_id, command=1, IO=0x1E, OV=output_value))