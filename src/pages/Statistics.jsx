import React from "react";
import DonutStatistics from "../components/DonutStatistics";
import styled from "styled-components";
import DonutLegend from "../components/DonutLegend";
import { useSelector } from "react-redux";

const Styled = {
  StatisticsWrapper: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    h1 {
      text-align: center;
      color: rgb(36, 50, 70);
      font-size: 30px;
      margin: 12px 0;
    }
  `,
  WrapperForDonut: styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  WrapperDescription: styled.div`
    margin-top: 40px;
    @media (max-width: 620px) {
      margin-top: 15px;
    }
  `,
};

const Statistics = () => {
  const dataForStatistic = useSelector((state) => state.todos);

  return (
    <Styled.StatisticsWrapper>
      <h1>Statistics</h1>
      <Styled.WrapperForDonut>
        <DonutStatistics />
        <Styled.WrapperDescription>
          <DonutLegend data={dataForStatistic} />
        </Styled.WrapperDescription>
      </Styled.WrapperForDonut>
    </Styled.StatisticsWrapper>
  );
};

export default Statistics;
