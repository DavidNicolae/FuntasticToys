FROM node 
WORKDIR /app
COPY package.json .
RUN npm i cors
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]