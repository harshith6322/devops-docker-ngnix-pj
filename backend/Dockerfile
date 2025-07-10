FROM node:current-alpine3.22
WORKDIR  /backend
COPY package*.json .
RUN npm install -g pnpm && pnpm install
COPY . .
EXPOSE 3000
CMD [ "pnpm", "start" ]


