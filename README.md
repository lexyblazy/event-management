# Events.io - An event management application

### A simple event management and scheduler built with MERN stack.

To host MERN stack applications, I know of two approaches.

## Using two servers:

- one for the client and one for the server.
  authentication is usually handled by a token based approach,<br> and it is easier to scale the backend
  to serve multiple channels (e.g mobile, tv)

## Using just one server:

- in this scenario, the express application serves the react application as part of its static assets.<br>
  But since this a relatively small and simple application, I choose to go with the one server approach<br>

### To run this application.

```
  git clone https://github.com/lexyblazy/event-management.git
  cd event-management
  npm install
  cd client && npm install
```

- Ensure you have mongodb running locally
- Create a _.env_ file in the client directory and add the `REACT_APP_GOOGLE_MAPS_API_KEY` key.<br>
  go to [google maps console](https://developers.google.com/maps/documentation/) to get your own map keys.
- Go back do the root directory and start the project in dev mode using the below commands

```
cd ..
npm run dev
```

