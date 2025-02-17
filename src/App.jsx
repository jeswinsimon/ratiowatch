import React from "react"
import styled from "styled-components"
import { Analytics } from "@vercel/analytics/react"

import Rates from "./components/Rates"
import TabView from "./components/TabView"
import Addresses from "./components/addresses/Addresses"

export function App() {
  const tabs = [
    {
      label: "Rates", content: <Rates />
    },
    { label: "Addresses", content: <Addresses /> },
  ]
  
  return (
    <Wrapper>
      <TabView tabs={tabs} />
      <Analytics />
    </Wrapper>
  )
}

const Wrapper = styled.div.attrs({
  className: "flex justify-center",
})`
  height: 100vh; /* Ensure full height of the page */
`