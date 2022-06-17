import axios from "axios";

//reg
export const cureg = ({ name, username, email, password }) => {
    return axios({
        method: "post",
        url: "http://127.0.0.1:4000/u/reg",
        data: {
            name: name,
            username: username,
            email: email,
            password: password
        }
    })
}
//log
export const culog = ({ email, password }) => {
    return axios({
        method: "post",
        url: "http://127.0.0.1:4000/u/log",
        data: {
            email: email,
            password: password
        }
    })
}