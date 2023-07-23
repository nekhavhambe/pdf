import pdf from './build/pdf'

const pdfFile = './1.pdf'; // Replace with the actual path to your PDF file
const pdfViewerContainer = document.getElementById('pdfViewer');

(async () =>{
 const file =  await pdf.getDocument(pdfFile).promise;
 const page = await file.getPage(1)

 const scale = 1.5;
 const viewport = page.getViewport({ scale: scale });

 // Create a canvas element
 const canvas = document.createElement('canvas');
 canvas.width = viewport.width;
 canvas.height = viewport.height;

 pdfViewerContainer.appendChild(canvas);

 // Render the PDF page into the canvas
 const context = canvas.getContext('2d');
 const renderContext = {
     canvasContext: context,
     viewport: viewport
 };
 page.render(renderContext);


})();

;



