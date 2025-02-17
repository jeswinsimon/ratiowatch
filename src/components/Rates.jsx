import React, { useState } from "react";
import styled from "styled-components";
import RatePanel from "./RatePanel";
import AddForm from "./AddForm";
import { CryptoCompare } from "../utils";
import { useLocalStorage } from "./useLocalStorage";
import { pairs as sampleData } from "../data";

const Rates = () => {
  const [pairs, setPairs] = useLocalStorage("pairs", sampleData);
  const [viewMode, setViewMode] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const addPair = (from, to, fromValue) => {
    setPairs([...pairs, { from, to, fromValue }]);
  };

  const removePair = index => {
    setPairs(pairs.filter((_, i) => i !== index));
  };

  return (
    <Container>
      {viewMode &&
        pairs.map((pair, i) => (
          <RatePanel
            key={i}
            handleRemove={() => removePair(i)}
            {...pair}
            API={CryptoCompare}
            editMode={editMode}
          />
        ))}
      {!viewMode && <AddForm handleSubmit={addPair} />}
      <Footer>
        <div className="f">
          {viewMode && !editMode && (
            <Link onClick={() => setViewMode(!viewMode)}>Add</Link>
          )}
          {viewMode && !editMode && (
            <Link onClick={() => setEditMode(!editMode)}>Remove</Link>
          )}
          {!viewMode && <Link onClick={() => setViewMode(true)}>Cancel</Link>}
          {editMode && <Link onClick={() => setEditMode(false)}>Cancel</Link>}
        </div>
      </Footer>
    </Container>
  );
};

const Container = styled.div.attrs({
  className: "w-100 flex flex-column mt4-ns",
})`
  max-width: 960px;
`;

const Link = styled.a.attrs({
  className: "link b pointer mr2",
})``;

const Footer = styled.div.attrs({
  className: "f6 code pa3 ph0-ns flex justify-between",
})``;

export default Rates;
