import { faArrowsRotate, faTemperatureThreeQuarters } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface TemperatureWidgetProps {
  temperature: { min: number; max: number } | null;
  onRefresh: (data: string) => void;
  loading: boolean;
  loadingTemperature: boolean;
}

const TemperatureWidget: React.FC<TemperatureWidgetProps> = ({
  temperature,
  onRefresh,
  loading,
  loadingTemperature,
}) => {
  return (
    <div className="widget">
      <h3><span className="temperature"><FontAwesomeIcon icon={faTemperatureThreeQuarters}/> Temperature</span></h3>
      {loading || loadingTemperature ? (
        <p>Loading...</p>
      ) : (
        <p>
          {temperature
            ? `${temperature.min}°C / ${temperature.max}°C`
            : "Loading..."}
        </p>
      )}

      <button onClick={() => onRefresh("temperature")}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
};

export default TemperatureWidget;
