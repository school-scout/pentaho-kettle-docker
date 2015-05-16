FROM mazzolino/pentaho-kettle

USER root
RUN apt-get -y install libswt-gtk-3-java

USER app

ENTRYPOINT ["./spoon.sh"]
