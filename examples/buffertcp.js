/* eslint-disable no-console */

// create an empty modbus client
//var ModbusRTU = require("modbus-serial");
var ModbusRTU = require("../index");
var client = new ModbusRTU();

// NPort Gateway 801D NetPort
// client.connectTcpRTUBuffered("192.168.1.73", {port: 502, removeCrc: true})
// client.connectTcpRTUBuffered("192.168.1.73", {port: 502, removeCrc: false
// client.connectTcpRTUBuffered("192.168.1.20", {port: 502, removeCrc: false})
client.connectTcpRTUBuffered("127.0.0.1", {port: 8502, removeCrc: false})
    .then(setClient)
    .then(function() {
        console.log("Connected");
    })
    .catch(function(e) {
        console.log(e.message);
    });

function setClient() {
    // set the client's unit id
    // set a timout for requests default is null (no timeout)
    client.setID(1);
    client.setTimeout(2000);

    // run program
    run();
}

function run() {
    // read the 4 registers starting at address 5
    client.readHoldingRegisters(5, 4)
        .then(function(d) {
            console.log("Receive:", d.data);
        })
        .catch(function(e) {
            console.log(e.message);
        })
        .then(close);
}

function close() {
    client.close();
}