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
      duration: '1m',
      //Rate per timeUnit
      rate: 1000,
      //Time Unit
      timeUnit: '1s',
      //Initial Virtual Users
      preAllocatedVUs: 2,
      //Max Virtual Users
      maxVUs: 1100
    }
  }
}
export default function () {
  // http.get('http://localhost:3001/qa/questions/1111/answers');
  http.get('http://localhost:3001/qa/questions?product_id=71705');
  sleep(1);
}
