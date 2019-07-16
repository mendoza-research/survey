[![Netlify Status](https://api.netlify.com/api/v1/badges/ac68c6cf-6aef-49d1-a79b-5abb0ef36ce3/deploy-status)](https://app.netlify.com/sites/kimendoz-survey/deploys)

## Site preview
[https://kimendoz-survey.netlify.com/](https://kimendoz-survey.netlify.com/). 

## Running a local server
To run the site in local environment, below programs are required. 
- Node.js (with NPM) - https://nodejs.org/en/
- yarn - https://yarnpkg.com/lang/en/

### Clone the repository
```git clone git@github.com:mendoza-research/survey.git```

### Add file that holds environment variables for Firebase
`.env` file with Firebase configurations

### Install packages
```yarn```

### Run site
```yarn start```

## Automatic Deployment
Any changes made to the repository will automatically be updated to the Netlify site. 

### Netlify environment variables
The environment variables in `.env` file should be set in Netlify in order for the app to save responses into Firebase. 
![Netlify Environment Variables](https://user-images.githubusercontent.com/1064036/61260255-69102e80-a7b8-11e9-8828-f8b0ebe1284c.png)
