FROM mysql/mysql-server

ENV MYSQL_ROOT_PASSWORD='password'
ENV MYSQL_ROOT_HOST=%
COPY schema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306