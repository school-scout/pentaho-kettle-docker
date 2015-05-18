# Pentaho Kettle on Docker

## Running kitchen

    docker run --rm \
      -e DATABASE_TYPE=MYSQL -e DATABASE_HOST=mysql.example.com -e DATABASE_DATABASE=mydb -e DATABASE_PORT=3306 -e DATABASE_USERNAME=myuser -e DATABASE_PASSWORD=mypass \
      mazzolino/pentaho-kettle kitchen.sh -rep repository -user <username> -pass <password> [ARGUMENTS]
