const Tbtn = ({ title, clas, onClick }) => (
  <div className={clas} onClick={onClick}>
    <button>{title}</button>
  </div>
);

const Tinput = ({ type, plc, value, clas, onChange }) => (
  <div className={clas}>
    <input
      value={value}
      type={type ? type : "text"}
      placeholder={plc}
      onChange={onChange}
    />
  </div>
);

const Tspan = ({ title, clas, onClick }) => (
  <div className={clas} onClick={onClick}>
    <span>{title}</span>
  </div>
);

const Timage = ({ src, clas, onClick, loaded }) => (
  <div className={clas} onClick={onClick}>
    <img onLoadedData={loaded} src={src} alt="" />
  </div>
);

const Tvideo = ({ src, clas, onClick }) => (
  <div className={`video ${clas}`} onClick={onClick}>
    <video src={src} controls />
  </div>
);

export { Tbtn, Tspan, Tinput, Timage, Tvideo };
