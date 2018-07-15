import React from "react";
import { Header } from "semantic-ui-react";

import FullContainer from "./FullContainer";

export default () => {
  return (
    <FullContainer>
      <div style={{ color: "#fff", textAlign: "center" }}>
        <Header as="h1" inverted>
          Page Not Found
        </Header>
        <Header as="h2" inverted>
          Sorry, this page does not exist
        </Header>
      </div>
    </FullContainer>
  );
};
