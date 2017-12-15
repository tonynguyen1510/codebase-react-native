/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2017-12-15 21:54:17
*------------------------------------------------------- */

import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class ButtonThemeExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button light><Text> Light </Text></Button>
          <Button primary><Text> Primary </Text></Button>
          <Button success><Text> Success </Text></Button>
          <Button info><Text> Info </Text></Button>
          <Button warning><Text> Warning </Text></Button>
          <Button danger><Text> Danger </Text></Button>
          <Button dark><Text> Dark </Text></Button>
        </Content>
      </Container>
    );
  }
}
