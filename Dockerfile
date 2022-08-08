FROM node:16.15-alpine

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i 
#--only=prod

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]