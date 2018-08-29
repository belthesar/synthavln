import React, { Component, Fragment } from 'react';
import { Parallax, ParallaxLayer } from 'react-spring';

import { Hero, Notifier, Queue } from 'components';

import styled from 'styled-components';
import Frame from 'styles/Frame';

const Layout = () => (
  <Fragment>
    <StyledHero />
    <StyledNotifier />
    <StyledQueue />
  </Fragment>
);

class Activity extends Component {
  render() {
    return (
      <Fragment>
        <Frame.Border />
        <Frame.Wrapper>
          <Layout />
        </Frame.Wrapper>
      </Fragment>
    );
  }
}

const StyledHero = styled(Hero)`
  grid-row: 1 / span 2;
`;

const StyledNotifier = styled(Notifier)`
  grid-row: 23 / span 2;
  align-self: end;
`;

const StyledQueue = styled(Queue)`
  grid-row: 25 / span 2;
  align-self: end;
`;

export default Activity;
