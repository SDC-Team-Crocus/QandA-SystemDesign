import http from 'k6/http';
import { sleep } from 'k6';
// export const options = {
//   //Virtual Users
//   vus: 5000,
//   //Duration
//   duration: '1m',
// };
export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      //Method of rate
      executor: 'constant-arrival-rate',
      //How long test runs
      duration: '2m',
      //Rate per timeUnit
      rate: 10000,
      //Time Unit
      timeUnit: '1s',
      //Initial Virtual Users
      preAllocatedVUs: 2,
      //Max Virtual Users
      maxVUs: 13000
    }
  }
}
export default function () {
  // http.get('http://localhost:3001/qa/questions/1111/answers');
  let id = Math.floor(Math.random() * (1000011 - 71000) + 71000);
  http.get(`http://localhost:3001/qa/questions?product_id=${id}`);
  sleep(1);
}
