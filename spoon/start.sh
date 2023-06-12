#!/bin/bash
set -euo pipefail

mkdir ~/.vnc
echo "$VNC_PASSWORD" | tightvncpasswd -f >~/.vnc/passwd
chmod 0600 ~/.vnc/passwd

tightvncserver -geometry "$VNC_GEOMETRY" :0

exec sh spoon.sh
