# FROM must be the first instruction
# sets the base image
# node running on alpine linux(5mb)
FROM node:20-alpine

# container will make this directory
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001
#will do port mapping in compose
#mapping is performed either in CLI or in compose file

CMD ["npm", "start"]

#since docker works on layering
#we install dependecies first
#then we copy code since it will keep changing
#docker cache will rebuild and install everytime if its below
