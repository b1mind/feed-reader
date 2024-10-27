# # Node build and run environment
# FROM node:18.17.1 as builder
# RUN mkdir /usr/src/app
# # ARG GIT_TOKEN
# WORKDIR /usr/src/app
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# COPY . /usr/src/app
# RUN npm install
# RUN npm run push
# RUN rm -f .npmrc
# # might have to change this cause vite3 update
# EXPOSE 3000
# RUN npm run build
# CMD ["node", "build"]

# better build from https://khromov.se/dockerizing-your-sveltekit-applications-a-practical-guide/
FROM node:18.17.1 AS builder
WORKDIR /user/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18.17.1
WORKDIR /user/src/app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]