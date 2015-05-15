# Pentaho Spoon on Docker

## Running Spoon

You need to have the user ID 1000 on your system for this to work. (Edit the Dockerfile otherwise.)

    docker run --rm -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix:ro mazzolino/pentaho-spoon
