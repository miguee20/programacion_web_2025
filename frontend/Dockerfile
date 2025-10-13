FROM node:20-alpine

WORKDIR /app

#copy dependencies files
COPY package*.json ./

# install all dependencies
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]