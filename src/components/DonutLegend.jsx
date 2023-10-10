import React from "react";
import { LegendOrdinal, LegendItem, LegendLabel } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";

const DonutLegend = ({ data }) => {
  const symbSize = 20;
  const completed = data.filter((item) => item.isCompleted).length;
  const active = data.filter((item) => !item.isCompleted).length;

  const ordinalColorScale = scaleOrdinal({
    domain: [`Active ${active}`, `Completed ${completed}`],
    range: ["rgb(45, 93, 147)", "rgb(153, 226, 170)"],
  });
  return (
    <div>
      <LegendOrdinal scale={ordinalColorScale}>
        {(labels) => (
          <div>
            {labels.map((label, i) => (
              <LegendItem key={`legend-quantile-${i}`} margin="5px 0">
                <svg width={symbSize} height={symbSize}>
                  <circle
                    cx={symbSize / 2}
                    cy={symbSize / 2}
                    r={symbSize / 4}
                    stroke={label.value}
                    strokeWidth="3px"
                    width={symbSize}
                    height={symbSize}
                    fill="none"
                  />
                </svg>
                <LegendLabel align="left" margin="0 0 0 4px">
                  {label.text} todos
                </LegendLabel>
              </LegendItem>
            ))}
          </div>
        )}
      </LegendOrdinal>
    </div>
  );
};

export default DonutLegend;
