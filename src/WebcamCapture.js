import React from "react";
import Webcam from "react-webcam";

const allowedIds = [
  "6b58a072d1f8a421fae5dd4ac47fbee1ea65488850db85c564da5d84fc4aeb18",
  "11f6d9af948c3f905704be4702a34aee86c9fdd0fba70fa15f41aba881055630",
];

const videoConstraints = {
  facingMode: "user",
};

const WebcamCapture = () => {
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);

  const refs = [React.useRef(), React.useRef()];

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(
        mediaDevices
          .filter(({ kind, deviceId }) => kind === "videoinput")
          .map((item, i) => {
            let newItem = item;
            newItem.ref = refs[i];
            return newItem;
          })
      ),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  React.useEffect(() => {
    console.log(devices);
  }, [devices]);

  const captureAll = () => {
    refs.forEach((camera) => {
      const b64 = camera.current.getScreenshot();
      console.log(b64);
    });
  };

  return (
    <div>
      <button onClick={captureAll}>Capture all</button>
      {devices.map((device, key) => (
        <div
          key={key}
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Webcam
            ref={device.ref}
            width={500}
            audio={false}
            videoConstraints={{
              deviceId: device.deviceId,
              ...videoConstraints,
            }}
            screenshotFormat="image/jpeg"
          >
            {({ getScreenshot }) => (
              <button
                style={{ width: "100px", marginTop: "1rem" }}
                onClick={() => {
                  const imageSrc = getScreenshot();
                  console.log(imageSrc);
                }}
              >
                Capture photo
              </button>
            )}
          </Webcam>

          <div>{device.label || `Device ${key + 1}`}</div>
        </div>
      ))}
    </div>
  );
};

export default WebcamCapture;

// https://www.npmjs.com/package/react-webcam
