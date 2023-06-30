FROM ghcr.io/gravity-ui/node-nginx:ubuntu20-nodejs18

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
