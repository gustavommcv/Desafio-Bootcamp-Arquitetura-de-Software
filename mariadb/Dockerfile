FROM mariadb:latest

COPY init.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=example
ENV MYSQL_DATABASE=bootcamp_desafio

EXPOSE 3306
