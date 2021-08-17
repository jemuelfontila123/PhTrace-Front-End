import axios from 'axios'

const http = 'http://localhost:3001/sms'



const sendVerificationCode = async(contactNumber) => {
    await axios.post(`${http}/verify`, {contactNumber})
}

const sendAlert = async(message, contactNumber) => {
    await axios.post(`${http}/message`, {message, contactNumber});
}
export default {
    sendVerificationCode,
    sendAlert
}