import React, { useState } from "react";

const EmbeddedIframe = ({ title, src, width, height, style, className }) => {
  const [scrollEnabled, setScrollEnabled] = useState(false)
  const enableScroll = () => { setScrollEnabled(true) }
  const disableScroll = () => { setScrollEnabled(false) }

  const iframeStyle = {
    pointerEvents: scrollEnabled ? 'auto' : 'none'
  }

  return (
    <div
      onClick={enableScroll}
      onMouseLeave={disableScroll}
      className={`iframe-container`}
    >
      <iframe
        title={title}
        className={`${className} airtable-embed`}
        src={src}
        frameBorder="0"
        width={width}
        height={height}
        style={{...iframeStyle, ...style}}
      />
    </div>
  )
};

EmbeddedIframe.defaultProps = {
  width: "100%",
  height: "533",
  style: { background: 'transparent', border: '1px solid #ccc' },
  className: ''
}

export default EmbeddedIframe;
