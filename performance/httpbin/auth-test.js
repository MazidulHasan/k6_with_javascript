import http from 'k6/http';
import { check } from 'k6';
// import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/examples/thresholds_readme_example.js';
export default function () {

  // 🔹 Step 1: Login (simulate auth)
  let loginPayload = JSON.stringify({
    username: "testuser",
    password: "testpass"
  });

  let loginRes = http.post(
    'http://localhost/post',
    loginPayload,
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'login status 200': (r) => r.status === 200,
  });





  // 🔹 Step 2: Extract token (simulate token)
  let responseJson = loginRes.json();

  // httpbin returns sent JSON under "json"
  let token = responseJson.json.username + "_fake_token";

  console.log("Generated Token:", token);






  // 🔹 Step 3: Authenticated GET request
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  let getRes = http.get(
    'http://localhost/get',
    authHeaders
  );

  check(getRes, {
    'GET status 200': (r) => r.status === 200,
  });






  // 🔹 Step 4: Authenticated POST request
  let postPayload = JSON.stringify({
    data: "Some protected data"
  });

  let postRes = http.post(
    'http://localhost/post',
    postPayload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );

  check(postRes, {
    'POST status 200': (r) => r.status === 200,
  });
}









// export function handleSummary(data) {
//   return {
//     "summary.html": htmlReport(data),
//   };
// }