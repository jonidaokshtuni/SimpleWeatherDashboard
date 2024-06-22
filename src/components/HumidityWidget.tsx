import { faArrowsRotate, faDroplet } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface HumidityWidgetProps {
  humidity: number | null;
  onRefresh: () => void;
  loading: boolean;
  loadingHumidity: boolean;
}

const HumidityWidget: React.FC<HumidityWidgetProps> = ({
  humidity,
  onRefresh,
  loading,
  loadingHumidity,
}) => {
  return (
    <div className="widget">
    <h3><span className="humidity"><FontAwesomeIcon icon={faDroplet}/> Humidity</span></h3>
      {loading || loadingHumidity ? (
        <p>Loading...</p>
      ) : (
        <p className="humidityvalue">{humidity !== null ? `${humidity}%` : "Loading..."}</p>
      )}
      <button onClick={onRefresh}>
        {" "}
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
};

export default HumidityWidget;
