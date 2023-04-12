FROM node:18

ARG CERT

# adding certificate
RUN mkdir /etc/crt
RUN echo $CERT > /etc/crt/cert.pem
RUN echo $CERT > /usr/local/share/ca-certificates/cert.pem
ENV NODE_EXTRA_CA_CERTS=/etc/crt/cert.pem

RUN apt-get update -y
RUN apt-get install -y telnet git nginx supervisor bzip2 iproute2 wget vim nano

RUN useradd -r app

# unlink default nginx config to prevent default server duplication error
RUN unlink /etc/nginx/sites-enabled/default


# --project Dockerfile--
ENV NEXT_TELEMETRY_DISABLED 1

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json package-lock.json /opt/app/

RUN npm i -g npm@latest
RUN npm ci

COPY . .
COPY ./deploy/nginx /etc/nginx
COPY ./deploy/supervisor/ /etc/supervisor/conf.d

RUN npm run build && \
    rm -rf deploy docs tests /tmp/* /root/.npm && \
    chown app /opt/app/node_modules/.bin/next

EXPOSE 80

CMD ["/usr/bin/supervisord"]
