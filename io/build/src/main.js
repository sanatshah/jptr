import net from 'net';
const socket = net.connect('7771', () => {
    console.log("listening");
});
var Remote;
(function (Remote) {
    Remote["LEFT"] = "LEFT";
    Remote["RIGHT"] = "RIGHT";
    Remote["ENTER"] = "ENTER";
})(Remote || (Remote = {}));
const stdin = process.stdin;
stdin.on('data', data => {
    switch (data.toString()[0]) {
        case 'a':
            socket.write(Remote.LEFT);
            break;
        case 'd':
            socket.write(Remote.RIGHT);
            break;
        default:
            socket.write(Remote.ENTER);
            break;
    }
    console.log("data: ", data.toString());
    console.log("data: ", data.toString() === "\\n");
    console.log("data: ", typeof (data.toString()));
});
stdin.setRawMode(true);
/*
import {createBluetooth} from 'node-ble'
const {bluetooth, destroy } = createBluetooth()
process.on('SIGINT', () => destroy());
let adapter;
try {
  adapter = await bluetooth.defaultAdapter()
if (! await adapter.isDiscovering()) {
  await adapter.startDiscovery()
}
} catch(e) {
  destroy()
  adapter = await bluetooth.defaultAdapter()
  if (! await adapter.isDiscovering()) {
    await adapter.startDiscovery()
  }
}

(await adapter.devices()).forEach(async (uid) => {
  console.log("uid: ", uid)
  const device = await adapter.getDevice(uid)
  console.log("name: ", await device.getName())
})

const device = await adapter.waitDevice('00:00:00:00:00:00')
console.log("got device: ", device)
await device.connect()
const gattServer = await device.gatt()

console.log("got gatt: ", gattServer)

destroy()


const service1 = await gattServer.getPrimaryService('uuid')
const characteristic1 = await service1.getCharacteristic('uuid')
await characteristic1.writeValue(Buffer.from("Hello world"))
const buffer = await characteristic1.readValue()
console.log(buffer)


const service2 = await gattServer.getPrimaryService('uuid')
const characteristic2 = await service2.getCharacteristic('uuid')
await characteristic2.startNotifications()
characteristic2.on('valuechanged', buffer => {
  console.log(buffer)
})
await characteristic2.stopNotifications()

await device.disconnect()*/
//# sourceMappingURL=main.js.map