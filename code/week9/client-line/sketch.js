let ws;

function setup() {
    createCanvas(windowWidth, windowHeight);

    background(0)

    ws = new WebSocket('ws://localhost:3000')

    ws.onmessage = (event) => {
        console.log(event.data)
        onMessage(event.data)
    }
}

function onMessage(data) {
    const json = JSON.parse(data)
    line(json.px, json.py, json.x, json.y)
    noStroke()
    fill(random(0,255),random(0,255),random(0,255), random(100, 200))
    circle(json.px, json.py, random(10,100))
}

function mousePressed(){
    sendData()
}

function mouseDragged(){
    sendData()
}

function sendData(){
    const data = {
        "px": pmouseX,
        "py": pmouseY,
        "x": mouseX,
        "y": mouseY
    }
    //console.log(JSON.stringify(data));
    ws.send(JSON.stringify(data));
}