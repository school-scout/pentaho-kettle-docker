FROM mazzolino/pentaho-kettle

RUN apt-get -y install libswt-gtk-3-java

RUN groupadd -g 1000 app && useradd -m -u 1000 -g 1000 app
USER app

ENTRYPOINT ["./spoon.sh"]
