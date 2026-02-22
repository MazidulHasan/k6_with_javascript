import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = "http://localhost:8080";

// 👇 Your user levels
const userLevels = [1, 2, 3];

export const options = {
  stages: userLevels.map((users) => ({
    duration: "20s",
    target: users,
  })),
};

export default function () {
  const loginRes = http.post(
    `${BASE_URL}/login`,
    JSON.stringify({
      username: "admin",
      password: "1234",
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  const token = loginRes.json("token");

  const heavyRes = http.get(`${BASE_URL}/heavy-page`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(heavyRes, {
    "heavy page loaded": (r) => r.status === 200,
  });

  sleep(1);
}