# Pull node from DockerHub to run app
FROM node:16

# Create app directory
WORKDIR /home/ubuntu/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Docker to listen to port on run time
EXPOSE 3001

CMD [ "npm", "server-dev" ]