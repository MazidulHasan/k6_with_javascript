import http from 'k6/http';
import { check } from 'k6';
import {randomString} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'


// $env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="html-report.html"; k6 run script.js

// $env:K6_WEB_DASHBOARD="true";
// $env:K6_WEB_DASHBOARD_EXPORT="html-report.html";
// $env:K6_WEB_DASHBOARD_PERIOD="1s";
// $env:K6_WEB_DASHBOARD_OPEN="false";
// k6 run script.js

export const  options = {
    vus: 1,
    duration: '10s'
}

let loginPayload = JSON.stringify({
    username: randomString(8),
    password: "testpass"
  });

const url = "http://localhost/post"
const data = JSON.parse(open('./payload.json'))

export default function(){
      let loginRes = http.post(
        url,
        loginPayload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('*** printing response ***', loginRes.body);
      
    
      check(loginRes, {
        'login status 200': (r) => r.status === 200,
      });
    
    
}