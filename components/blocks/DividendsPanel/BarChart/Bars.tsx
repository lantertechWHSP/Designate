export const Bars = ({ data, height, scaleX, scaleY }) => {
    return <>
        {
            (Array.isArray(data) && data.length > 0) &&  <g className="bars">
                {data.map(({ value, label }) => (
                    <rect
                        className="bar"
                        key={`bar-${label}`}
                        x={scaleX(label)}
                        y={scaleY(value)}
                        width={scaleX.bandwidth()}
                        height={height - scaleY(value)}
                        fill="teal"
                    />
                ))}
          </g>
        }
    </>
}
