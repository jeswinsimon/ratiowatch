import React, { useState } from "react";
import styled from "styled-components";
import AddressPanel from "./AddressPanel";
import AddForm from "./AddForm";
import { useLocalStorage } from "../useLocalStorage";

const Addresses = () => {
  const [wallets, setWallets] = useLocalStorage("wallets", []);
  const [viewMode, setViewMode] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const addWallet = (selectedWallet, address) => {
    setWallets([...wallets, { selectedWallet, address }]);
  };

  const removeWallet = index => {
    setWallets(wallets.filter((_, i) => i !== index));
  };

  return (
    <Container>
      {viewMode &&
        wallets.map((wallet, i) => (
          <AddressPanel
            key={i}
            handleRemove={() => removeWallet(i)}
            address={wallet.address}
            wallet={wallet.selectedWallet}
            editMode={editMode}
          />
        ))}
      {!viewMode && <AddForm handleSubmit={addWallet} />}
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

export default Addresses;
