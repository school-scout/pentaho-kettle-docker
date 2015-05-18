FROM ubuntu:trusty

# Instlal java
RUN apt-get -y install software-properties-common curl
RUN add-apt-repository ppa:webupd8team/java
RUN apt-get update
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections
RUN apt-get -y install oracle-java8-installer oracle-java8-set-default #ant

# Install PDI
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN curl -L http://downloads.sourceforge.net/project/pentaho/Data%20Integration/4.2.1-stable/pdi-ce-4.2.1-stable.tar.gz | tar xz --strip-components=1

# Install newer MySQL connector
RUN rm libext/JDBC/mysql-connector-java-5.1.17.jar \
 && curl -L https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.35.tar.gz | tar xz --strip-components=1 -C libext/JDBC/ mysql-connector-java-5.1.35/mysql-connector-java-5.1.35-bin.jar

ENV PATH=/usr/src/app:$PATH

RUN groupadd -g 1000 app && useradd -m -u 1000 -g 1000 app
RUN mkdir /home/app/.kettle && chown app:app /home/app/.kettle
VOLUME /home/app/.kettle
USER app
