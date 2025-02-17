import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { getBitcoinAddressInfoBlockCypher as getBitcoinAddressInfo } from "../../api/bitcoin";
import { getFantomAddressInfoFromHTML as getFantomAddressInfo } from "../../api/fantom";
import { useFetch } from "../useFetch";
import { color, CryptoCompare } from "../../utils";

const red = color(255, 153, 153);

const theme = {
  cc: lighten(0.3, "#58CA71"),
};

function AddressPanel({ address, wallet, editMode, handleRemove = () => console.log("will remove!") }) {
  const [addressInfo, setAddressInfo] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { rate, error: rateError } = useFetch(wallet === "BTC" ? "BTC" : "FTM", "USD", CryptoCompare);

  useEffect(() => {
    const fetchAddressInfo = async () => {
      try {
        const info = wallet === "BTC" ? await getBitcoinAddressInfo(address) : await getFantomAddressInfo(address);
        setAddressInfo(info);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAddressInfo();
  }, [address, wallet]);

  const isLoading = addressInfo === null && error === null;
  const truncatedAddress = `${address.slice(0, 5)}...${address.slice(-5)}`;
  const message = isLoading
    ? "Loading address info..."
    : error
    ? `Error: ${error}`
    : `${truncatedAddress}: ${wallet === "BTC" ? addressInfo.totalUnspentBalance / 100000000 : addressInfo.balance / 1e18} ${wallet}`;

  const usdValue = rate && addressInfo ? (wallet === "BTC" ? (addressInfo.totalUnspentBalance / 100000000) * rate : (addressInfo.balance / 1e18) * rate) : null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="flex">
      {editMode && <RemoveButton onClick={handleRemove}>x</RemoveButton>}
      <div className="flex-column w-100">
        <Panel isError={!!error} color={theme["cc"]} onClick={() => setExpanded(!expanded)}>
          {message}
        </Panel>
        {expanded && addressInfo && !isLoading && !error && (
          <Details>
            <div>Current Balance: {wallet === "BTC" ? addressInfo.totalUnspentBalance / 100000000 : addressInfo.balance / 1e18} {wallet}</div>
            {wallet === "BTC" && (
              <>
                <div>Pending Balance: {addressInfo.pendingBalance / 100000000} BTC</div>
                <div>Confirmed UTXOs: {addressInfo.confirmedUTXOCount}</div>
                <div>Pending UTXOs: {addressInfo.pendingUTXOCount}</div>
              </>
            )}
            {usdValue !== null && <div>Current Balance in USD: ${usdValue.toFixed(2)}</div>}
            <ShowWrapper>
              <BlurWrapper show={showDetails}>
                <QRCodeWrapper>
                  <QRCode value={address} size={128} />
                </QRCodeWrapper>
                <AddressWrapper>
                  <div>{address}</div>
                  <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
                </AddressWrapper>
              </BlurWrapper>
              {!showDetails && <ShowButton onClick={() => setShowDetails(true)}>Show Address</ShowButton>}
            </ShowWrapper>
          </Details>
        )}
      </div>
    </div>
  );
}

export default AddressPanel;

const RemoveButton = styled.div.attrs({
  className:
    "bg-red code f4 f3-l black-60 pv2 pv3-m pv3-l ph3 pointer bb-black-10 mr1 mb1",
})``;

export const Panel = styled.div.attrs({
  className:
    "code f4 f3-l b black-60 pv2 pv3-m pv3-l ph3 pointer bb b--black-10 w-100 mb1",
})`
  background: ${props => (props.isError ? red(10) : props.color)};

  &:hover {
    background: ${props => (props.isError ? red(15) : props.color)};
  }
`;

const Details = styled.div.attrs({
  className: "code f5 black-60 pv2 ph3",
})`
  background: #f9f9f9;
  border-top: 1px solid #ccc;
`;

const QRCodeWrapper = styled.div.attrs({
  className: "flex justify-center mt3",
})``;

const AddressWrapper = styled.div.attrs({
  className: "flex justify-center mt3",
})`
  flex-direction: column;
  align-items: center;
`;

const CopyButton = styled.button.attrs({
  className: "mt2 pa2 bg-black-10 pointer",
})`
  border: none;
  cursor: pointer;
`;

const BlurWrapper = styled.div`
  filter: ${props => (props.show ? "none" : "blur(5px)")};
  position: relative;
  text-align: center;
  background: inherit;
`;

const ShowWrapper = styled.div`
  position: relative;
  text-align: center;
`;

const ShowButton = styled.button.attrs({
  className: "mt2 pa2 bg-black-10 pointer",
})`
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
  font-weight: bold;
  mix-blend-mode: lighten;
`;
