FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD "target/assistant-manager-server-0.1.0-RC2.jar" "app.jar"
ADD "target/static/hour-list-template.ods" "hour-list-template.ods"
EXPOSE 8080 8081
ENV JAVA_OPTS=""
RUN apk update && apk add bash
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]