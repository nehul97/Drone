
var mqtt = require('mqtt')
var client = "";
var client1 = "";
let msg1 = "";
let msg2 = "";

msg1 = [
    {
        "Delivery_ID": "",
        "customer_ID": "",
        "Height": "",
        "latitude": "",
        "longitude": "",
        "weight": "",
        "Msg_type": "",
        "Battery_status":"" ,
        "Delivery_status": ""
    },
    {
        //data
    },
    {
        //data
    }
]

msg2 = [
    {
        "Delivery_ID": "",
        "customer_ID": "",
        "Height": "",
        "latitude": "",
        "longitude": "",
        "weight": "",
        "Msg_type": "",
        "Battery_status":"" ,
        "Delivery_status": ""
    },
    {
        //data
    },
    {
        //data
    }
]



var i = 0;
var msg1_length = msg1.length      //  Payload of drone A
var msg2_length = msg2.length      // Payload of drone B
console.log(msg1_length , msg2_length);
device_id = ""


test(device_id)
var flag = true;
const getInfo = () => {

 //publishing Drone A data 
    if (flag == true) {
        console.log("flag  " + flag)
        let data = msg1[i]
        client.publish("v1/devices/me/telemetry", JSON.stringify(data))
        console.log(data);
        i++
        if (i == msg1_length) {
            console.log("flag  " + flag)
            i = 0;
            flag = false;
        }

    }
// publishing Drone B data
    if (flag == false) {
        console.log("flag  " + flag)
        let data = msg2[i]
        client.publish("v1/devices/me/telemetry", JSON.stringify(data))
        console.log(data);
        i++
        if (i == msg2_length) {
            console.log("flag  " + flag)
            i = 0;
            flag = true;
        }

    }

}
setInterval(getInfo, 3000); //call function after 3 sec

function test(id) {
    var options = { username: id, password: "" };
    client = mqtt.connect('mqtt://demo.thingsboard.io', options);
    client.on('connect', function () {
        console.log('Connected');
    })
    client.on('message', function (topic, message) {
        console.log(message.toString())
    })
}

