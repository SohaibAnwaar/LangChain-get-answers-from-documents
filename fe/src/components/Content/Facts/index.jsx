import PropTypes from "prop-types";
function convertObjectPattern(content) {
  const keyword = content
    .split("\n")
    .filter((str) => str.trim() !== "")
    .map((str) => str.trim());
  return keyword;
}
const Facts = ({ info, onCardClick }) => {
  return (
    <div className="h-[50vh] overflow-y-auto p-4 bg-gray-100 border rounded-lg bg-base-100 shadow-lg">
      {info.sources?.map(({ content, page_no }) => (
        <button
          key={page_no} // Added key prop for each button element
          className="flex justify-center items-center py-2"
          onClick={() => {
            onCardClick({
              keyword: convertObjectPattern(content),
              pageNumber: page_no,
            });
            console.log({
              keyword: convertObjectPattern(content),
              pageNumber: page_no,
            });
          }}
        >
          <div className="shadow-lg rounded-lg p-6 max-w-sm bg-cyan-500">
            <div className="text-black  text-lg font-semibold mb-4">
              {content}
            </div>
            <div className="text-white">Page No: {page_no}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

Facts.propTypes = {
  info: PropTypes.shape({
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        page_no: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default Facts;
