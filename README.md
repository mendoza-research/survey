[![Netlify Status](https://api.netlify.com/api/v1/badges/ac68c6cf-6aef-49d1-a79b-5abb0ef36ce3/deploy-status)](https://app.netlify.com/sites/kimendoz-survey/deploys)

## Site preview
[https://kimendoz-survey.netlify.app/](https://kimendoz-survey.netlify.app/). 

## Running a local server
To run the site in local environment, below programs are required. 
- Node.js (with NPM) - https://nodejs.org/en/
- yarn - https://yarnpkg.com/lang/en/

### Clone the repository
```git clone git@github.com:mendoza-research/survey.git```

### Add file that holds environment variables for Firebase
~~`.env` file with Firebase configurations~~<br>
The environment variables are no longer required since all interactions with the Firestore is proxied through cloud functions to handle reCAPTCHA. 

### Install packages
```yarn```

### Run site
```yarn start```
<br><br>
Although the app will be loaded into `localhost:3000` by default, be sure to use `127.0.0.1:3000` as the URL. reCAPTCHA only supports `127.0.0.1` for local testing. 

## Firebase Firestore & Cloud Functions
This is a serverless application using Firestore and Cloud Functions. During development, it is much, much faster to use the emulators to test cloud functions. 

### Add Firebase Admin SDK private key
Generate firebase admin SDK private `.json` key file and add it to `functions` directory.<br>
Snippets and private key file can be viewed/downloaded at
[https://console.firebase.google.com/u/0/project/kimendoz-survey/settings/serviceaccounts/adminsdk](https://console.firebase.google.com/u/0/project/kimendoz-survey/settings/serviceaccounts/adminsdk)

### Add Google reCAPTCHA Secret Key
A secret key that is paired with the site key for Google's reCAPTCHA is required to verify that a submission origniated from a human.
<br><br>
Add a `recaptcha-secret-key.json` to `functions` directory. Refer to the `recaptcha-secret-key-example.json` for the example format.

### Running emulator on localhost
- On project root folder, run `firebase serve` to launch emulators.

### Deploying functions
To deploy cloud functions, use the command below at the project root. 
```firebase deploy --only functions```

## Automatic Deployment
Any changes made to the repository will automatically be updated to the Netlify site. 

### Netlify environment variables
The environment variables in `.env` file should be set in Netlify in order for the app to save responses into Firebase. 
![Netlify Environment Variables](https://user-images.githubusercontent.com/1064036/61260255-69102e80-a7b8-11e9-8828-f8b0ebe1284c.png)
