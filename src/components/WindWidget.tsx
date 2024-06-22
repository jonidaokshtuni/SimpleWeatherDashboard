import { faArrowsRotate, faWind } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface WindWidgetProps {
  wind: number | null;
  onRefresh: () => void;
  loading: boolean;
  loadingWind: boolean;
}

const WindWidget: React.FC<WindWidgetProps> = ({
  wind,
  onRefresh,
  loading,
  loadingWind,
}) => {
  return (
    <div className="widget">
      <h3><span className="wind"><FontAwesomeIcon icon={faWind}/> Wind</span></h3>
      {loading || loadingWind ? (
        <p>Loading...</p>
      ) : (
        <p className="speed">{wind !== null ? `speed: ${wind} m/s` : "Loading..."}</p>
      )}
      <button onClick={onRefresh}>
        {" "}
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
};

export default WindWidget;
