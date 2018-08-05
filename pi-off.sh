#!/bin/sh
# Send a request to IFTTT on shutdown.
#
time="$(expr $3 - 1)"
echo "Shutting down in $time minutes, power off in $3 minutes..."
query_string="http://lab.grapeot.me/ifttt/delay?event=$1&key=$2&t=$3"
curl -X POST "$query_string"
sudo shutdown $time

exit 0
