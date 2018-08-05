#!/bin/sh
# Send a request to IFTTT on shutdown.
#
query_string="http://lab.grapeot.me/ifttt/delay?event=$1&key=$2&t=$3"
echo "Sending event at $(date '+%F %T')"
curl -X POST "$query_string"
time="$(expr $3 - 1)"
echo "\nShutting down in $time minutes, power off in $3 minutes..."
sudo shutdown $time

exit 0
