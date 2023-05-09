import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  //Virtual Users
  vus: 10,
  //Duration
  duration: '30s',
};
export default function () {
  http.get('http://localhost:3001/qa/questions/1111/answers');
  // http.get('http://localhost:3001/qa/questions?product_id=71701');
  sleep(1);
}
