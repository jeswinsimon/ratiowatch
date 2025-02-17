import React, { useState } from "react";
import styled from "styled-components";
import { color } from "../../utils";
import { wallets } from "../../data";

const theme = color(255, 212, 0);

function Field({ placeholder, ...props }) {
  return (
    <InputWrapper>
      <Input placeholder={placeholder} {...props} />
    </InputWrapper>
  );
}

const InputWrapper = styled.div.attrs({
  className: "ba mb2 br2 b--black-10",
})``;

const Input = styled.input.attrs({
  className: "w-100 br2 pa2 f3 code bn",
  type: "text",
})``;

const Submit = styled.input.attrs({
  className: "w-100 br3 pa2 f3 code bn bg-black-10 pointer",
  type: "button",
})``;

const FieldSet = styled.div.attrs({
  className: "flex flex-column w-100 ph3",
})`
  max-width: 500px;
`;

const FieldWrapper = styled.div.attrs({
  className: "flex pa4-ns pv4 w-100 justify-center",
})`
  background: ${theme(9)};
`;

const Dropdown = styled.select.attrs({
  className: "w-100 br2 pa2 f3 code bn",
})``;

export default function AddForm({ handleSubmit }) {
  const [address, setAddress] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(wallets[0].id);

  const handleChange = (field, value) => {
    if (field === "address") {
      setAddress(value);
    } else if (field === "wallet") {
      setSelectedWallet(value);
    }
  };

  const submit = () => {
    if (address.trim() !== "") {
      handleSubmit(selectedWallet, address);
    }
  };

  return (
    <FieldWrapper>
      <FieldSet>
        <InputWrapper>
          <Dropdown
            value={selectedWallet}
            onChange={(e) => handleChange("wallet", e.target.value)}
          >
            {wallets.map(wallet => (
              <option key={wallet.id} value={wallet.id}>
                {wallet.label}
              </option>
            ))}
          </Dropdown>
        </InputWrapper>
        <Field
          value={address}
          placeholder="Address"
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <Submit value="Add Wallet" onClick={submit} />
      </FieldSet>
    </FieldWrapper>
  );
}
