import React, { useState } from "react";
import styled from "styled-components";
import { lighten } from "polished";
import Graph from "./Graph";
import { color } from "../utils";
import { useFetch } from "./useFetch";

const red = color(255, 153, 153);

const theme = {
  cc: lighten(0.3, "#58CA71"),
};

function RatePanel({
  from,
  to,
  precision = 2,
  editMode,
  handleRemove = () => console.log("will remove!"),
  API,
}) {
  const [graphMode, setGraphMode] = useState(false);
  const { rate, error } = useFetch(from, to, API);

  const isLoading = rate === null && error === null;
  const roundedRate = rate && parseFloat(rate).toFixed(precision);

  let message = isLoading
    ? "Loading rate..."
    : `1 ${from} = ${roundedRate} ${to}`;

  if (error) {
    message = `Error: ${error}`;
  }

  return (
    <div className="flex">
      {editMode && <RemoveButton onClick={handleRemove}>x</RemoveButton>}
      <div className="flex-column w-100">
        <Panel
          onClick={() => setGraphMode(!graphMode)}
          isError={!!error}
          color={theme["cc"]}
        >
          {message}
        </Panel>
        {graphMode && <Graph from={from} to={to} />}
      </div>
    </div>
  );
}

export default RatePanel;

const RemoveButton = styled.div.attrs({
  className:
    "bg-red code f4 f3-l black-60 pv2 pv3-m pv3-l ph3 pointer bb-black-10 mr1 mb1",
})``;

export const Panel = styled.div.attrs({
  className:
    "code f4 f3-l b black-60 pv2 pv3-m pv3-l ph3 pointer bb b--black-10 w-100 mb1",
})`
  background: ${(props) => (props.isError ? red(10) : props.color)};

  &:hover {
    background: ${(props) => (props.isError ? red(15) : props.color)};
  }
`;
