import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ value }) => {
  return (
    <div>
      <QRCode value={value} size={128} />
    </div>
  );
};

export default QRCodeGenerator;