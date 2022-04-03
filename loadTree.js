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

        setTimeout(reject, 10 * 1000, 'Timeout!');
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

    drawCanvas(ns, div)
    .then(() => drawRect(ns))
}

function drawCanvas(ns, canvas) {
    svg = document.createElementNS(ns, 'svg')

    svg.setAttributeNS(null, 'width', '100%')
    svg.setAttributeNS(null, 'height', '100%')
    canvas.appendChild(svg)

    return Promise.resolve();
}

function drawRect(ns) {
    var rect = document.createElementNS(ns, 'rect')

    rect.setAttributeNS(null, 'width', 100)
    rect.setAttributeNS(null, 'height', 100)
    rect.setAttributeNS(null, 'fill', 'red')

    svg.appendChild(rect)
}

const zoomValue = 100;

function zoomCanvas(input) {

}

function zoomin() {
    svg.style.width = (svg.clientWidth + zoomValue) + "px";
    svg.style.height = (svg.clientHeigth + zoomValue) + "px";
}
  
function zoomout() {
    svg.style.width = (svg.clientWidth - zoomValue) + "px";
    svg.style.height = (svg.clientHeigth - zoomValue) + "px";
}
