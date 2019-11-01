FROM node:8
RUN mkdir -p /app
WORKDIR /multichat
COPY package.json /multichat
RUN npm i
RUN npm i -g nodemon
COPY . /multichat
EXPOSE 8080
CMD ["node", "app.js"]