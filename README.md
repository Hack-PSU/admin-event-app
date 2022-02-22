# Event Admin App

The event admin app is an internal application used to scan and register hackers
during workshops and events to record extra credit and attendance.

## Getting Started

### Environment Variables

The environment variables should be prefixed by the development environment being used.

| Variable | Description |
| -------- | ----------- |
| STAGING | Determines whether the development environment should use `STAGING` variables or `PROD` variables. |
| API_KEY | Firebase api key |
| AUTH_DOMAIN | The auth domain used for Firebase Authentication |
| DB_URL | The database url obtained from Firebase |
| PROJECT_ID | The project id from Firebase |
| STORAGE_BUCKET | Firebase config storage bucket url |
| MESSAGING_SENDER_ID | Firebase messaging sender id |
| APP_ID | Firebase app id |
| BASE_URL | The base URL for the Api calls. The URL should end in the version number (eg. `https://api.url.com/v2`) |

#### Formatting

The formatting for environment variables except for `STAGING` should always be prefixed by either `STAGING` or `PROD`.
For example for `PROD` environment, the variables should be:

```dotenv
PROD_API_KEY
PROD_AUTH_DOMAIN
PROD_DB_URL
PROD_PROJECT_ID
PROD_STORAGE_BUCKET
PROD_MESSAGING_SENDER_ID
PROD_APP_ID
PROD_BASE_URL
```

At the top of the `.env` file, there should be a variable indicating the environment: the `STAGING` variable.

An example of a complete `.env` file is:

```dotenv
STAGING=true  # or STAGING=false

STAGING_API_KEY
STAGING_AUTH_DOMAIN
STAGING_DB_URL
STAGING_PROJECT_ID
STAGING_STORAGE_BUCKET
STAGING_MESSAGING_SENDER_ID
STAGING_APP_ID
STAGING_BASE_URL

PROD_API_KEY
PROD_AUTH_DOMAIN
PROD_DB_URL
PROD_PROJECT_ID
PROD_STORAGE_BUCKET
PROD_MESSAGING_SENDER_ID
PROD_APP_ID
PROD_BASE_URL
```

Refer to the [Firebase](#firebase) section to find Firebase config variables.

### Firebase
To get the Firebase configuration variables, head to the `hackpsu18` project in Firebase and go 
to the web apps section of the project. The configuration used should be for the web app and 
not the iOS or Android apps. Copy the appropriate configuration using the format [above](#environment-variables)

### Local Development

The app uses React Native with the Expo Managed Workflow. To run the app, Node version `14+` or the 
latest version `16+` is required, which can be found [here](https://nodejs.org/en/). 
The app also requires `yarn` to be installed.

After installing `node` and `npm`.
```shell
npm install -g yarn
```

Install dependencies:
```shell
yarn
```

Start the development server:
```shell
expo start
```

### Publishing Updates
To publish updates, run the login to an account that has publishing permissions 
for the `hackpsu` Expo organization.

Publish updates:
```shell
expo publish
```

### Deployment
The app will be deployed to Expo servers and is available to those that
are invited to the organization. To access the deployment, download the Expo Go
app and login to your own account (assuming you were added to the organization).
Under the `Profile` tab, there should be an organization name `@hackpsu` and you can access
the most updated version of the app under the `projects` section.
