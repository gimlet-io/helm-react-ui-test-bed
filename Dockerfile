FROM node:lts-alpine
COPY  package.json package-lock.json /app/
WORKDIR /app
RUN apk add git
RUN git config --global url."https://".insteadOf git://
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]