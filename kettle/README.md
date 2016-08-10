# Pentaho Kettle on Docker

## Running kitchen

Replace `APP_UID` and `APP_GID` with the local user id and group id on your system.

    docker run --rm \
			-e APP_UID=1000 -e APP_GID=1000 \
      -e DATABASE_TYPE=MYSQL -e DATABASE_HOST=mysql.example.com -e DATABASE_DATABASE=mydb -e DATABASE_PORT=3306 -e DATABASE_USER=myuser -e DATABASE_PASSWORD=mypass \
      schoolscout/pentaho-kettle kitchen.sh -rep repository -user <username> -pass <password> [ARGUMENTS]
