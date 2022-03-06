import "./loadingSpinner.css";

const LoadingSpinner = ({ h = 28, w = 28, b = 6 }) => {
  const style = {
    borderBottom: `${b}px solid #6fce42`,
  };
  return (
    <div className={`w-${w} h-${h} relative loading`}>
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full arc"
        style={style}
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full arc"
        style={style}
      ></div>
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full arc"
        style={style}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
