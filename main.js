

const pdfFile = './2.pdf'; // Replace with the actual path to your PDF file
const pdfViewerContainer = document.getElementById('pdfViewer');

(async () => {
    pdfjsLib.getDocument(pdfFile).promise.then(async (file) => {
        const page = await file.getPage(1)

        

        function getScreenResolution() {
    return {
        width: window.screen.width,
        height: window.screen.height
    };
}

const screenResolution = getScreenResolution();

const desiredViewportWidth = screenResolution.width * 0.9; // Adjust the scale as needed
    const desiredViewportHeight = screenResolution.height * 0.9;

        const scale = 1;
       

        // Create a canvas element
        let page1 = document.getElementById('page1');
        let canvas = document.getElementById('canvas');
        let textLayer = document.getElementById('text');

        page1.className = 'page';
        textLayer.className = 'textLayer';

        let viewer = document.getElementById('pdfViewer');
        viewer.appendChild(page1);


        //
        const viewport1 = page.getViewport({ scale: scale });

        const my_scale = Math.min(desiredViewportWidth / viewport1.width, desiredViewportHeight / viewport1.height);

        const viewport = page.getViewport({ scale: my_scale })


        let canvasContext = canvas.getContext('2d');

         canvas.width = viewport.width ;
         canvas.height = viewport.height ;
        // page1.style.width = `${viewport.width}px`;
        // page1.style.height = `${viewport.height}px`;;
        // pdfViewerContainer.style.width = `${viewport.width}px`;
        // pdfViewerContainer.style.height = `${viewport.height}px`;


        

        // Render the PDF page into the canvas
        const context = canvas.getContext('2d');
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        console.log(page)
        await page.render(renderContext,  {
enablePrintAutoSizing: false,
});


        page.getTextContent().then(function (textContent) {
            // const textLayer = new pdfjsLib.TextLayerBuilder({
            //     textLayerDiv: textLayerDiv,
            //     pageIndex: 0,
            //     viewport: viewport
            // });
            pdfjsLib.renderTextLayer({
                textContentSource: textContent,
                container: textLayer,
                viewport: viewport,
                textDivs: []
            });
        });
    });



})();

const wrapper =  document.getElementById("wrapper");
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
let scaler = 1;
btn.addEventListener("click",() => {
scaler++;
wrapper.style.scale = scaler;

});
btn1.addEventListener("click",() => {
if(scaler == 1) {
  return true;
}
scaler--;
wrapper.style.scale = scaler;

});




//

const resizableContainer = document.querySelector('#wrapper2');
const resizableContent = document.getElementById('resizableContent');

let isResizing = false;
let startX;
let startY;
let startWidth;
let startHeight;

// Function to start resizing
function startResize(e) {
e.preventDefault();
isResizing = true;
startX = e.clientX;
startY = e.clientY;
startWidth = parseFloat(document.defaultView.getComputedStyle(resizableContainer).width, 10);
startHeight = parseFloat(document.defaultView.getComputedStyle(resizableContainer).height, 10);

document.addEventListener('mousemove', resize);
document.addEventListener('mouseup', stopResize);
}

// Function to resize the div
function resize(e) {
if (!isResizing) return;

const deltaX = e.clientX - startX;
const deltaY = e.clientY - startY;

resizableContainer.style.width = startWidth + deltaX + 'px';
resizableContainer.style.height = startHeight + deltaY + 'px';
}

// Function to stop resizing
function stopResize() {
isResizing = false;
document.removeEventListener('mousemove', resize);
document.removeEventListener('mouseup', stopResize);
wrapper.style.scale = 1.5;
}

// Add event listener to the edge of the resizable container
resizableContainer.addEventListener('mousedown', startResize);