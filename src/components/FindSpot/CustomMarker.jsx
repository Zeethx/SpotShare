import React from "react";
import { OverlayView } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const CustomMarker = ({ position, label, spotId, dateTimeIn, dateTimeOut }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const queryParams = new URLSearchParams({
      dateTimeIn: dateTimeIn.toISOString(),
      dateTimeOut: dateTimeOut.toISOString(),
    }).toString();

    navigate(`/reserve/${spotId}?${queryParams}`);
  };

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div className="custom-marker" onClick={handleClick}>
        {label}
      </div>
    </OverlayView>
  );
};

export default CustomMarker;
