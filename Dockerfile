FROM node:latest
ARG PORT=3000
ENV PORT ${PORT}
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN yarn install
RUN yarn global add serve
ENV NODE_ENV=production
RUN yarn run build

CMD serve -l ${PORT} -s /app/build
