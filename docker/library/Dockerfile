FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --force && npm cache clean --force
COPY . .

FROM node:18-alpine as main
WORKDIR /app
COPY --from=build /app /app
CMD ["npm", "run", "start"]
EXPOSE ${PORT}