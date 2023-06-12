FROM schoolscout/pentaho-kettle

RUN apt-get update \
 && apt-get -y install firefox tightvncserver \
 && rm /var/lib/apt/lists/* -fR

COPY --chown=1000 start.sh /usr/local/bin/

ENV USER=app DISPLAY=:0
ENV VNC_GEOMETRY 1280x1024

CMD ["/usr/local/bin/start.sh"]
VOLUME ["/home/app/.kettle"]
