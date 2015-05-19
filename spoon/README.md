# Pentaho Spoon on Docker

## Running Spoon

You need to have the user ID 1000 on your system for this to work. (Edit the Dockerfile otherwise.)

    docker run --rm \
      -e DATABASE_TYPE=MYSQL -e DATABASE_HOST=mysql.example.com -e DATABASE_DATABASE=mydb -e DATABASE_PORT=3306 -e DATABASE_USERNAME=myuser -e DATABASE_PASSWORD=mypass \
      -e DISPLAY=$DISPLAY -v $HOME/.kettle:/home/app/.kettle -v /tmp/.X11-unix:/tmp/.X11-unix:ro mazzolino/pentaho-spoon
