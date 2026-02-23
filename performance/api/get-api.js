import http from "k6/http";
import {check} from 'k6'

export const options = {
    vus: 10,
    iterations: 20
}

export default function () {
    const response = http.get('https://quickpizza.grafana.com/')

    check(response, {
        'status code validation' : (response) => response.status===200
    })
}