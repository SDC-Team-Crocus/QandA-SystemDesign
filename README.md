# Question and Answers System Design

## Backend project to convert a monolithic E-Commerce API into separate Microservices. This repository is focused on isolating the Questions and Answers of each shopping item into it's own RESTful API. The focus of this project is to scale the API horizontally to optimize traffic load capabilities and upgrade the backend with minimal downtime during deployment.

## Tech Stack Implemented: Node.js, Express.js, PostgreSQL, Redis, NGINX Load Balancing, PM2 Node Clustering, AWS EC2
## Target: Create Microservice RESTful API and Scale to hit a response time of less than 2000 ms and 1% error rate

## Table of Contents
1. [PostgreSQL Schema](#PostgreSQL-Schema)
2. [API Routing](#API-Routing)
3. [Optimizations Implemented](#Optimizations-Implemented)
4. [Installation](#Installation)
5. [Contributors](#Contributors)
6. [Deployed API](#Deployed-API)
7. [License](#License)

## PostgreSQL Schema

### Initial Design
- Initial API contained CSV data for 3 Tables (Questions, Answers, Photos)
#### Schema for RDBMS
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/806aa448-64c3-4a49-89fd-8ee3164b3beb)
#### Data Models for NoSQL
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/aac2bed2-62f1-4033-8982-794af4b90cc4)

### Final Design
- Although both options are viable options, due to the fact that the data being worked with has been structured from working with the previous Atelier API, new data types are not expected and any foreseeable future changes is highly unlikely. Normalizing the data would allow querying to be "easier" in a sense that the data is organized in specific tables. Larger community base allows for debugging and finding solutions at a quicker rate. PostgreSQL is currently touted as the most installed database on Node Package Manager (NPM). Query speed does not seem to be a concern due to the data being simplistic. Although within current widget (Questions and Answers), ACID compliance is not of concern, in general for an E-Commerce site which includes transactions, using a standardized database throughout would make this simpler.
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/6f3a936b-7552-4824-bc8b-25a79bd24286)

## API Routing
### Addresses
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/ff1c6e96-ee73-4b5f-92ef-d5d53d9e7099)


## Optimizations Implemented
### Database Indexing
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/58c5b380-e276-43c4-811b-41c16d544fa2)
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/3a7d07c5-3d90-4426-ba5b-9d6644c07d29)

### PostgreSQL Refactoring
- <img width="930" alt="image" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/82f81cd9-2224-4d55-ade3-1215860c33cd">
- Original threshold of 1500 requests/second utilizing JavaScript to format JSON data and make calls to database.
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/3e4c32a1-30d0-4c0d-b0cf-2b3f6045f23b)
- Due to high time complexity JavaScript for loops, utilized PostgreSQL querying due to native C speed outperforming JavaScript. PostgreSQL also had JSON formatting capabilities. Increased to 5000 requests/second.
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/f3dbd2a4-2197-49d7-bdbd-8cf0b6e697c8)

### NGINX Load Balancing
- <img width="288" alt="image" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/3b82390a-aa14-461d-aa0a-7a8657179cf8">

### Redis Caching
- Original Benchmark without Redis Caching stress tested through Loader.io
- <img width="935" alt="Screenshot 2023-05-25 at 6 47 33 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/47106067-a203-487f-8971-7e0a7afc5bb4">
- Redis Caching implemented. Load tested with repeating product id to guarantee O(1) time complexity for GET requests. 25% latency speed increase.
- <img width="939" alt="Screenshot 2023-05-25 at 7 02 24 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/2d84d925-c6bb-4922-a1db-20cc5ab4eea6">

### PM2 Clustering
- EC2 T2.micro comparison. No noticeable speed increase due to 1 physical core count. Clustering will not have an effect unless there are multiple threads.
- <img width="940" alt="Screenshot 2023-05-25 at 6 45 21 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/571eebe8-830c-488a-ae64-d06b6f80aedb">
- <img width="935" alt="Screenshot 2023-05-25 at 6 47 33 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/8d33b484-73ee-4e69-b450-8d9774665cf9">

### Multi Server Deployment
- Final Threshold of Scaled API. Meeting criteria of less than 2000 ms response time and 1% error rate.
- <img width="1175" alt="Screenshot 2023-06-01 at 10 58 37 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/be27c16b-e04a-47d5-babf-92b450a099e3">


## Installation

Use the package manager [npm](https://docs.npmjs.com/) to install necessary dependencies.

```bash
npm install
```
### Install the following necessary databases to your machine:

- Documentation for PostgreSQL can be found [here](https://www.postgresql.org/download/).
- Documentation for Redis can be found [here](https://redis.io/download/#redis-downloads).

## Deployed API

### Original Concept
<img width="818" alt="Screenshot 2023-06-09 at 6 08 40 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/c59acc60-8145-4e49-87a1-1c289095c5e5">

### Scaled API
<img width="830" alt="Screenshot 2023-06-09 at 6 08 27 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/1ab1ef23-40eb-48d5-8a59-dcc9400904cc">

## Contributors
#### [Anthony Bui](https://www.linkedin.com/in/bui-anthony/) | [Github](https://github.com/aboowee)

## License

[ISC](https://opensource.org/license/isc-license-txt/)
