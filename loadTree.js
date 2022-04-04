const width = 1920, height = 1080, margin = 100;
var svg;

function openDataFile(xobj) {
    return new Promise((resolve, reject) => {
        xobj.onreadystatechange = () => {
            if (xobj.readyState == 4 && xobj.status == "200") {
                resolve(xobj.responseText);
            } else {
                reject(xobj.responseText);
            }
        }
        xobj.send(null);

        setTimeout(reject, 10000, 'Timeout!');
    })
    .catch((response) => {
        console.log(`Error al abrir el fichero de datos${response ? `: ${response}` : ''}`);
        return Promise.reject();
    })
}

function loadJSON(file) {
    var xobj = new XMLHttpRequest();

    xobj.open('GET', file, true);
    xobj.overrideMimeType("application/json");
    
    return openDataFile(xobj);
}

async function getData(file = 'data.json') {
    const data = await loadJSON(file);
    console.log(JSON.stringify(data));
}

function draw() {
    var ns = 'http://www.w3.org/2000/svg';
    var div = document.getElementById('tree')
    setWheelZoom(document.getElementById('mockUp'));
    // svg = div.children[0];

    // drawCanvas(ns, div)
    // .then(() => drawRect(ns))
}

function drawCanvas(ns, canvas) {
    svg = document.createElementNS(ns, 'svg')

    setWheelZoom(svg)

    svg.setAttributeNS(null, 'width', 1920)
    svg.setAttributeNS(null, 'height', 1080)
    canvas.appendChild(svg)

    return Promise.resolve();
}

function drawRect(ns) {
    var rect = document.createElementNS(ns, 'rect')

    rect.setAttributeNS(null, 'width', 1920)
    rect.setAttributeNS(null, 'height', 1080)
    rect.setAttributeNS(null, 'fill', 'red')

    svg.appendChild(rect)
}

// ZOOM
const zoomValue = 100;
var scale = 0.001;

function setWheelZoom(elem) {
    elem.onwheel = zoomWithScroll
}

function zoomWithScroll(event) {
    event.preventDefault();
    console.log(event)
    zoom(event.deltaY, event.target);
}

function zoom(deltaY, elem = svg) {
    scale += deltaY * -0.01;

    // Restricción de escala
    scale = Math.min(Math.max(1, scale), 4);

    // Aplicar transformación de escala
    elem.style.transform = `scale(${scale})`;
}

function zoomin() {
    zoom(-zoomValue);
}

function zoomout() {
    zoom(zoomValue);
}

// DRAG SVG

