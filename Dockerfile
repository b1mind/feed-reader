# Node build and run environment
FROM node:16.7 as builder
RUN mkdir /usr/src/app
ARG GIT_TOKEN
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm install
RUN rm -f .npmrc
# might have to change this cause vite3 update
EXPOSE 3000
RUN npm run build
CMD ["node", "./build/index.js"]