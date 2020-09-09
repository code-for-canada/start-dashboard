import React from "react";

const EmbeddedIframe = ({ title, src, width, height, style, className }) => {
  return (
    <iframe
      title={title}
      className={`${className} airtable-embed`}
      src={src}
      frameBorder="0"
      width={width}
      height={height}
      style={style}
    />
  )
};

EmbeddedIframe.defaultProps = {
  width: "100%",
  height: "533",
  style: { background: 'transparent', border: '1px solid #ccc' },
  className: ''
}

export default EmbeddedIframe;