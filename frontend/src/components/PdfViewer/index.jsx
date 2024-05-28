import PropTypes from "prop-types";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js`;
function removeSingleWordStrings(arr) {
  return arr.filter((str) => str.trim().split(/\s+/).length > 1);
}
const PdfViewer = ({ fileMeta }) => {
  const { pageNumber, keyword } = fileMeta;
  console.log(fileMeta);
  const searchPluginInstance = searchPlugin({
    keyword: removeSingleWordStrings(keyword),
    onHighlightKeyword: (props) => {
      props.highlightEle.style.outline = "2px dashed blue";
      props.highlightEle.style.backgroundColor = "green";
    },
  });

  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js`}
    >
      <div className="h-[70vh] overflow-y-auto p-4 bg-gray-100 border rounded-lg bg-base-100 shadow-lg">
        <Viewer
          fileUrl="src/valente2015.pdf"
          plugins={[searchPluginInstance]}
          initialPage={pageNumber}
          defaultScale={SpecialZoomLevel.PageFit}
        />
      </div>
    </Worker>
  );
};

PdfViewer.propTypes = {
  fileMeta: PropTypes.shape({
    keyword: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    pageNumber: PropTypes.number.isRequired,
  }).isRequired,
};

export default PdfViewer;
