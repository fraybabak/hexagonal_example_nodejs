# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Expose the port your Node.js application is listening on (assuming it's port 3000)
EXPOSE 3000

# Specify the command to run your Node.js application
CMD ["npm", "start"]
