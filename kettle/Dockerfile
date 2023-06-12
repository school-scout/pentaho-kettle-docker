FROM ubuntu:22.04

RUN apt-get update \
 && apt-get install -y --no-install-recommends curl gosu openjdk-8-jre \
 && apt-get clean \
 && rm /var/lib/apt/lists/* -fR

# Install PDI
COPY pdi-ce-4.2.1-stable /usr/src/app
WORKDIR /usr/src/app

# Install newer MySQL connector
RUN curl -L https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.13.tar.gz | tar xz --strip-components=1 -C libext/JDBC/ mysql-connector-java-8.0.13/mysql-connector-java-8.0.13.jar

ENV PATH=/usr/src/app:$PATH

COPY with_app_user /
COPY configure_and_start.mysql8 /configure_and_start
ENTRYPOINT ["/with_app_user", "/configure_and_start"]
