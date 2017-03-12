[![Build Status](https://travis-ci.org/hbcwr/pco-schedule-swapper.svg?branch=master)](https://travis-ci.org/hbcwr/pco-schedule-swapper)
[![Greenkeeper badge](https://badges.greenkeeper.io/hbcwr/pco-schedule-swapper.svg)](https://greenkeeper.io/)

# pco-schedule-swapper

An application for requesting schedule swaps.

## Contributing

Any commits to `master` triggers a build to https://pco-swapper.neverendingqs.com/. Please ensure `master` is production ready at all times.

### Setting up environment variables

Powered by [dotenv](https://github.com/motdotla/dotenv).

Generate a Planning Center Online OAuth 2.0 client credentials at https://api.planningcenteronline.com/oauth/applications, with `https://localhost:3001/oauth/callback` as one of the `Callback URLs`. With those credentials, create a `.env` file at the root of the repository:


```ini
PCO_CLIENT_ID=<Client ID>
PCO_CLIENT_SECRET=<Secret>
```

### Starting a local version of this app

```bash
# Installing dependencies; run this the first time
npm install

# Running a local version; automatically detects file changes
npm start
```

### Running tests

```bash
npm test
```

### Deploying a version to AWS

For most changes, it should be possible to develop without deploying to AWS.

```bash
serverless deploy
```

Note: a custom domain name is required, as any non-empty base URL causes the app to generate an invalid redirect URI. See http://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html for details on how to set up a custom domain.
