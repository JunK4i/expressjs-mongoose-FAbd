---
title: ExpressJS Mongoose
description: An ExpressJS server that connects to a MongoDB database
tags:
  - express
  - mongodb
  - mongoose
  - typescript
---

# ExpressJS Mongoose

[ExpressJS](https://expressjs.com/) server that connects to a Railway MongoDB database using [MongooseJS](https://mongoosejs.com/) Deployed on Railway

## ✨ Features

- Express
- TypeScript
- MongoDB with Mongoose

## 💁‍♀️ How to use

- Install dependencies `yarn`
- Connect to your Railway project `railway link`
- Start the development server `railway run yarn dev`

# 📝 Reasons for choosing MongoDB

- NoSQL database is chosen to offer flexibility in storing semi-structured data, given the diverse data types we might encounter in an event management application
- MongoDB is designed to scale horizontally, meaning that we can easily distribute data across multiple servers as we scale. Aligning well with increased usage of the application

# 📝 Reasons for choosing Mongoose

Mongoose ORM provides a structured way to model entities and maintain consistency and organization in our data.

# 📝 Reasons for choosing Railway

- Simplified deployment process and integration with Github
- Managed Database hosting
- Environment management, easily store database and configuration settings securely whilst sharing with different deployments on the same project
- Automated CI/CD deployment with Github repositry
- Analytics tools to monitor traffic and performance
- Since all deployments are managed on Railway, it is easy to monitor and configure seamlessly
