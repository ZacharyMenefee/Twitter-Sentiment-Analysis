# Getting Started with my Twitter Sentiment Analysis Application

In light of basic development for this project being finished I wanted to update the readme file to represent changes that have been made. Twitter Sentiment Analysis at a base level if a simple web application to provide parases results from the Azure Sentiment Analysis API based on recieved twitter data queried 10 tweets at a time through recent searches. This project was completed as a capstone project for the Code Louisville Program's Javascript cohort. In that vein, it contains the following features: 

- Retrieve data from an external API and display data in your app (such as with fetch() or with AJAX) -> Achieved to fetch data from my own API using an call through the Axios library, all calls to Twitter and Azure use external clients on the server side.

- Develop your project using a common JavaScript framework such as React, Angular, Vue, etc. -> The front-end of the project was developed using React albeit in the slightly older class-based syntax using JSX; the project should be refactored to the newer fuctional syntax relatively soon.

- Create a web server with at least one route and connect to it from your application using ExpressJS -> Twitter Sentiment Analysis uses an express server to host a backend API that provides a parsed response object based on a passed search value.

Some additional work to be completed on the project is as follows: 

- Potentially, moving the project to utilize server-side rendering.
- Deploying the project a popular hosting service such as Heroku.
- Providing caching in order to reduce repetitive API use.
- Unique IDs for components in order to reduce errors. 
- More adequate backend error handling and form validation.
- Optimizing rendering and performance speed.
- Additionally, a refactor from Javascript to Typescript might be in order.
