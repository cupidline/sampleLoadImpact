import { check, sleep } from "k6";
import { Rate } from "k6/metrics";
import http from "k6/http";


// See https://docs.k6.io/docs/options for other options
export let options = {
  // simulate rampup of traffic from 1 to 20 users over 2 minutes.
  stages: [
    { duration: "2m", target: 20 },
    
  ]
  
}
export default function() {
    
    //check get
    let res = http.get("https://reqres.in/api/users/2");
    check(res, {
        "status is 200": (res) => res.status === 200,
       
        
    })
    var resBody = JSON.parse(res.body)
    var email =  JSON.stringify(resBody.data.email)
    //console.log(email);
    
    //check login and take token
    var data = {    "email": "eve.holt@reqres.in",    "password": "cityslicka"};
    let resLogin = http.post("https://reqres.in/api/login",data);
    check(res, {
        "status is 200": (r) => r.status === 200,
        
    })
    var resBodyLogin = JSON.parse(resLogin.body)
    var tokenAuth =  JSON.stringify(resBodyLogin.token)
    //console.log(tokenAuth);

    //failed login
    var data = {    "email": "eve.holt@reqres.in"};
    let resLoginFailed = http.post("https://reqres.in/api/login",data);
    check(resLoginFailed, {
        "status is 400": (r) => r.status === 400,
        
    })
    var resBodyLoginFailed = JSON.parse(resLoginFailed.body)
    var errorMessage =  JSON.stringify(resBodyLoginFailed.error)
    //console.log(errorMessage);

  sleep(1); 
}
