import React from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Styled = {
  StatisticsWrapper: styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
  `,
};

const DonutStatistics = () => {
  const dataForStatistic = useSelector((state) => state.todos);

  const dataForPie = [
    {
      id: 1,
      title: "Active",
      description: "Active todos",
      count: dataForStatistic.filter((item) => !item.isCompleted).length,
      color: "rgb(45, 93, 147)",
      domain: "Active",
    },
    {
      id: 2,
      title: "Completed",
      description: "Completed todos",
      count: dataForStatistic.filter((item) => item.isCompleted).length,
      color: "rgb(153, 226, 170)",
      domain: "Completed",
    },
  ];

  const width = 300;
  const height = 300;
  const half = width / 2;

  return (
    <Styled.StatisticsWrapper>
      <svg width={width} height={height}>
        <Group left={half} top={half}>
          <Pie
            data={dataForPie}
            outerRadius={half}
            innerRadius={half - 25}
            pieValue={(data) => data.count}
            padAngle={0.02}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g key={arc.data.id}>
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
    </Styled.StatisticsWrapper>
  );
};

export default DonutStatistics;
