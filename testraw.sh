#!/bin/bash

tmp="";
fh=0;
cel=0;

# requires i2c-tools, wget and bc to work.
while :;
do
	tmp=$(i2cget -y 1 0x5a 0x07 w)
	cel=$(($tmp/50))
	fh=$(echo "scale=2; ($cel - 273.15) * 1.8 + 32" | bc)
	cel=$(echo "scale=2; $cel - 273.15" | bc)
	dt=$(echo "f-$fh-c-$cel")
	#echo $dt
	wget -qO- "http://192.168.1.104:8080?dt=f-$fh-c-$cel" &> /dev/null
	sleep 1
done
