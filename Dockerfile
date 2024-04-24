FROM node:21.7.1-alpine

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3000

# 가만히...
# CMD ["tail", "-f", "/dev/null"]

CMD ["npm", "start"]
