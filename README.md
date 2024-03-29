# Pro_Expenses_Tracker

<p align="center">
    <img width="80%" height="80%" src="./Readme_images/app_photo.jpg">
  </p>
Pro expenses tracker is a MERN stack and responsive application that requires the user to sign in to save all expenses to reach from anywhere. Users can track and filter expenses and income. Users can also manage debts and loans that need to be paid.

## Watch Demo

You can [click here](https://pro-expenses-tracker.netlify.app/) to watch the Demo which is deployed to Netlify website.
> You may feel some slow at first because I deployed the backend on [render](https://render.com/) website. so once it works fine it will be fast.

## Use locally

> Note: it's better to follow these steps in order

- Copy and rename the `.env.example` file `.env` and put the right value (you api endpoint without the last slash like that `https://example-endpoint.com`) in the variables.
- In Cli use this commands all in the `root` directory path in order

First you need to run this command to install some packages we need to run the app in the main directory

```
npm i
```
Go to [pro-expenses-tracker-api](https://github.com/ObadaMoustafa/pro-expenses-tracker-api) repo and follow instructions then continue from here.

This command to run the application locally

```
npm start
```

## Technologies and npm used

- ## Database

  - Mongodb
  - Mongoose npm - to manage the schemas and data before going to the database
  - bcrypt npm - to hash the passwords and secure it
  - currency-symbol-map npm - to turn the currency name to the currency symbol
  <p align="center">
    <img width="80%" height="80%" src="./Readme_images/database_schema.png">
  </p>

- ## Use env files

  - dotenv npm - to access env files for to secure important variables and keys

- ## Frontend
  - React and React-router-dom to be able to navigate between several pages
  - Sass to style with some functions and variables

## MIT LICENSE

[MIT license](https://github.com/ObadaElSharbatly/Pro_Expenses_Tracker/blob/main/LICENSE)
