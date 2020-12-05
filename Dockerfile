FROM node:10
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000

#DEVELOP
CMD ["sh", "./start.sh"]

#PRODUCTION
# RUN yarn build
# CMD ["yarn", "start:prod"]