FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
CMD [ "node","dist/server.js" ]
ENTRYPOINT [ "I am Runnig On Docker" ]
EXPOSE 3000