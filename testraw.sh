#!/bin/bash
for i in {1..1000}
do
	echo $i
	i2cget -y 1 0x5a 0x07 w
done
