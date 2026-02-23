import http from "k6/http";

export const options = {
    stages:[
        {duration:'1m', target:10},
        {duration:'5m', target:10},
        {duration:'30s', target:0}
    ]
}

export default function(){
    http.get("https://quickpizza.grafana.com/")
}