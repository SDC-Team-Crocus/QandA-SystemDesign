# Question and Answers System Design

Backend project to convert a monolithic E-Commerce API into separate Microservices. This repository is focused on isolating the Questions and Answers of each shopping item into it's own RESTful API. The focus of this project is to scale the API horizontally to optimize traffic load capabilities and upgrade the backend with minimal downtime during deployment.

Tech Stack Implemented: Node.js, Express.js, PostgreSQL, Redis, NGINX Load Balancing, PM2 Node Clustering, AWS EC2

## Table of Contents

1. [PostgreSQL Schema](#PostgreSQL-Schema)
2. [API Routing](#API-Routing)
3. [Optimizations Implemented](#Optimizations-Implemented)
4. [Setup](#Setup)
5. [Contributors](#Contributors)
6. [License](#License)

## PostgreSQL Schema

### Initial Design
- Product overview consists of an image container, rating, category information, product name, product style options, size selection, quantity selection, add to cart button, favorite outfit button, and product description / features pulled from multiple API calls. 
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/806aa448-64c3-4a49-89fd-8ee3164b3beb)
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/aac2bed2-62f1-4033-8982-794af4b90cc4)

### Final Design
- ![image](https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/6f3a936b-7552-4824-bc8b-25a79bd24286)




## API Routing
### Shopping Cart
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

## Optimizations Implemented
### Database Indexing
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

### PostgreSQL Refactoring
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

### NGINX Load Balancing
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

### Redis Caching
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

### PM2 Clustering
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

### Multi Server Deployment
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

## Installation

Use the package manager [npm](https://docs.npmjs.com/) to install necessary dependencies.

```bash
npm install
```

## Deployed API

### Original Concept
<img width="818" alt="Screenshot 2023-06-09 at 6 08 40 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/c59acc60-8145-4e49-87a1-1c289095c5e5">

### Scaled API
<img width="830" alt="Screenshot 2023-06-09 at 6 08 27 PM" src="https://github.com/SDC-Team-Crocus/QandA-SystemDesign/assets/106826710/1ab1ef23-40eb-48d5-8a59-dcc9400904cc">

## Contributors
#### [Anthony Bui](https://www.linkedin.com/in/bui-anthony/) | [Github](https://github.com/aboowee)

## License

[ISC](https://opensource.org/license/isc-license-txt/)
