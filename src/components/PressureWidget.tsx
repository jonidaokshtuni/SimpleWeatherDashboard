import { faArrowsRotate, faGauge } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface PressureWidgetProps {
  pressure: number | null;
  onRefresh: () => void;
  loading: boolean;
  loadingPressure: boolean;
}

const PressureWidget: React.FC<PressureWidgetProps> = ({
  pressure,
  onRefresh,
  loading,
  loadingPressure,
}) => {
  return (
    <div className="widget">
     <h3><span className="pressure"><FontAwesomeIcon icon={faGauge}/> Pressure</span></h3>
      {loading || loadingPressure ? (
        <p>Loading...</p>
      ) : (
        <p>{pressure !== null ? `${pressure} hPa` : "Loading..."}</p>
      )}
      <button onClick={onRefresh}>
        {" "}
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
};

export default PressureWidget;
