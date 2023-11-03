import React from "react";

type GradientBorderDirectionType =
  | "top-to-bottom"
  | "right-to-left"
  | "bottom-to-top"
  | "left-to-right";
type GradientBorderColorType = Array<{
  offset: number;
  color: string;
}>;
export interface BorderGradientComponentProps {
  gradientBorderWidth: number;
  gradientBorderRadius: number;
  gradientBorderColor: GradientBorderColorType;
  gradientBorderDirection: GradientBorderDirectionType;
  gradientBorderColorDeg: number;
  gradientBorderChildren: React.ReactNode;
}

const BorderGradientComponent = (props: BorderGradientComponentProps) => {
  const {
    gradientBorderWidth,
    gradientBorderRadius,
    gradientBorderColor,
    gradientBorderDirection,
    gradientBorderColorDeg,
    gradientBorderChildren,
  } = props;
  const elementRef = React.useRef<SVGSVGElement>(null);
  const [Width, setWidth] = React.useState(0);
  const [Height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      console.log("first", width, height);
      setWidth(width);
      setHeight(height);
    }
  }, []);
  return (
    <svg
      ref={elementRef}
      className="w-full h-full relative"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="customGradient"
          x1={`${gradientBorderDirection === "right-to-left" ? "100%" : "0%"}`}
          y1={`${gradientBorderDirection === "bottom-to-top" ? "100%" : "0%"}`}
          x2={`${gradientBorderDirection === "left-to-right" ? "100%" : "0%"}`}
          y2={`${gradientBorderDirection === "top-to-bottom" ? "100%" : "0%"}`}
          gradientTransform={`rotate(${gradientBorderColorDeg})`}
        >
          {gradientBorderColor.map((item, index) => (
            <stop
              offset={`${item?.offset}%`}
              stopColor={item?.color}
              key={index}
            />
          ))}
        </linearGradient>
        <path
          d={`M${
            gradientBorderRadius + gradientBorderWidth
          } ${gradientBorderWidth} h${
            Width - 2 * gradientBorderRadius - 2 * gradientBorderWidth
          } a${gradientBorderRadius},${gradientBorderRadius} 0 0 1 ${gradientBorderRadius},${gradientBorderRadius} v${
            Height - 2 * gradientBorderRadius - 2 * gradientBorderWidth
          } a${gradientBorderRadius},${gradientBorderRadius} 0 0 1 -${gradientBorderRadius},${gradientBorderRadius} h-${
            Width - 2 * gradientBorderRadius - 2 * gradientBorderWidth
          } a${gradientBorderRadius},${gradientBorderRadius} 0 0 1 -${gradientBorderRadius},-${gradientBorderRadius} v-${
            Height - 2 * gradientBorderRadius - 2 * gradientBorderWidth
          } a${gradientBorderRadius},${gradientBorderRadius} 0 0 1 ${gradientBorderRadius},-${gradientBorderRadius} z`}
          stroke="url('#customGradient')"
          strokeWidth={gradientBorderWidth}
          fill="none"
          id="myCircle"
        />
      </defs>
      <use href="#myCircle" fill="url('#customGradient')" />
      <foreignObject
        x="0"
        y="0"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${Width - 2 * gradientBorderWidth}px`,
            height: `${Height - 2 * gradientBorderWidth}px`,
            borderRadius: `${gradientBorderRadius}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "absolute",
            top: `${gradientBorderWidth}px`,
            left: `${gradientBorderWidth}px`,
          }}
        >
          <div
            style={{
              width: `100%`,
              height: `100%`,
            }}
          >
            {gradientBorderChildren}
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

export default BorderGradientComponent;
