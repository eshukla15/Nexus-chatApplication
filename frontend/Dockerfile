# Build Stage
#temp build container
#this part will be used to convert react components 
#into js bundles as browser understands that only
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Production Stage

#nginx is v good at serving static files
FROM nginx:alpine

#multi-stage build
#copies dist folder having html css js
#node_modules, source code vite etc is not needed
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# starts web server
CMD ["nginx", "-g", "daemon off;"]