FROM node:18
WORKDIR /app
COPY . .
RUN npm config set http://127.0.0.1:8989
RUN npm install
EXPOSE 4000
CMD ["node", "server"]