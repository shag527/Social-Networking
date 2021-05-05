# Social Networking Website
### Semester Project for Software Engineering Lab

We are living in the age of Social Networking like Facebook, LinkedIn, Google + etc. The objective is to develop a social networking application with various features.

## Features

- **Posts Feed** Fresh posts from people you are following.
- **Explore** New Posts and People.
- **Follow/Unfollow** a particular user and get notified for their activity.
- **Chat Application** Chat with anyone on common room.
- **Personalize Profile** With profile/cover photo and personal posts.
- **Authentication & Authorization** with Password reset functionality.
- **Covid Chatbot** For info about Covid related things
- **New Feed** about current affairs.

## Demo

Check [Here](https://yaaak.herokuapp.com/signin)

## Screenshots of the app
<p align="center">
  <br>
<img align="center" src="https://res.cloudinary.com/fierce-citadel/image/upload/v1620157161/Screenshot_from_2021-05-05_01-04-41_kx2ti6.png" width="850" height="420">   
 </p>
<p align="center">
  <br>
<img align="center" src="https://res.cloudinary.com/fierce-citadel/image/upload/v1620157161/Screenshot_from_2021-05-05_01-04-50_ca1kzl.png" width="850" height="420">   
 </p><p align="center">
  <br>
<img align="center" src="https://res.cloudinary.com/fierce-citadel/image/upload/v1620157163/Screenshot_from_2021-05-05_01-05-13_no7xli.png" width="850" height="420">   
 </p><p align="center">
  <br>
<img align="center" src="https://res.cloudinary.com/fierce-citadel/image/upload/v1620157165/Screenshot_from_2021-05-05_01-05-30_tkexol.png" width="850" height="420">   
 </p><p align="center">
  <br>
<img align="center" src="https://res.cloudinary.com/fierce-citadel/image/upload/v1620157161/Screenshot_from_2021-05-05_01-05-39_jrkeil.png" width="850" height="420">   
 </p><p align="center">
  <br>
<img align="center" src="https://res.cloudinary.com/fierce-citadel/image/upload/v1620157161/Screenshot_from_2021-05-05_01-05-44_mkmyu0.png" width="850" height="420">   
 </p>


## Quick Installation

```
1. Go to root folder and start server by nodemon start
2. Go to client folder and start client by npm start
```

After this, open [http://localhost:3000/signin](http://localhost:3000/) to see your app.


## Requirements and Configuration

You’ll need to have Node 8.16.0 or Node 10.16.0 or later version on your local development machine

By default, the app uses MongoDB hosted on [mLab](https://mlab.com/) and [Cloudinary](https://cloudinary.com/) CDN for hosting images. We have created a demo user for mLab and Cloudinary so you can run the app locally without adding Mongo URL and Cloudinary API Key, however when you start developing your application it is recommended to replace that information with your own, so that everyone has their own Database and CDN.


### Replacing Mongo URL

Replace `MONGO_URL` value in `api/.env` file with your `mLab` database url or with local one.

### Replacing Cloudinary API Key

Grab `Cloud name` `API Key` and `API Secret` from Cloudinary dashboard and replace corresponding values inside `api/.env` file.

### Mail Provider

For password reset functionality you will need to replace Email Provider values also in `api/.env` file.
