# WallStreetDocs - Service Status

This project was developed for WallStreetDocs as a code challenge.  
As per the requirements, it targets node 6.5 and does not use babel, react, etc.  
Stack:

- node 6.5 + express 4
- bootstrap
- jquery
- sass
- grunt
- c3.js

## Highlights

- Authentication with the service status api is only made when expired and is reused across users.
- Report fetching is only made after X time passed since existing data was generated.
- Grunt, Bootstrap and jQuery used as per requirements
- Charts rendered via c3.js (which depends on d3js)

## Run locally

- Node 6.5.0: check you're on 6.5 by running `node --version` (`nvm` allows switching node versions)
- Clone this repo
- Install dependencies: `cd` into repo and run `yarn install`
- Set env variables: copy `.env.sample` to `.env` and set `API_CLIENT_SECRET`
- Launch express: run `yarn dev`
- Load app: open `http://localhost:3000` in your browser
- Run tests: run `yarn test`
- JS bundling and SASS via Grunt: run `yarn grunt`

## TODO

- improve loading feedback
- refresh report after X minutes
- refined charts
- aditional service list filters
- service list sorting
