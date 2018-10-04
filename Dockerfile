FROM node:8.11.3
EXPOSE 3113
ADD package.json /var/www/package.json
ADD app.js /var/www/app.js
ADD config.js /var/www/config.js
WORKDIR /var/www
RUN npm install
CMD node app.js