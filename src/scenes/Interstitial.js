import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Logo, Summaries, Ticker } from 'components';
import { Events, Notifications } from 'providers';

import styled from 'styled-components';
import { rgba } from 'polished';
import { Frame } from 'styles';

function TickerArea({ isVisible }) {
  const { events } = useContext(Events.Context);
  return (
    <>
      <StyledLogo isVisible={isVisible} />
      <StyledSummaries isVisible={isVisible} />
      <StyledTicker events={events} isVisible={isVisible} />
    </>
  );
}

const Message = ({ title, subtitle }) => (
  <Wrapper>
    <Title>
      {title}
      <Dot>.</Dot>
    </Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
);

function Layout(props) {
  return (
    <StyledWrapper>
      <TickerArea isVisible />
      <Message {...props} />
    </StyledWrapper>
  );
}

function Structure({ children }) {
  return <>{children}</>;
}

function Scene(props) {
  return (
    <Notifications.Provider>
      <Events.Provider>
        <Structure>
          <Layout {...props} />
        </Structure>
      </Events.Provider>
    </Notifications.Provider>
  );
}

Message.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

Message.defaultProps = {
  title: '',
  subtitle: ''
};

Structure.propTypes = {
  children: PropTypes.node.isRequired
};

TickerArea.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

const StyledWrapper = styled(Frame.Wrapper)`
  grid-template-columns: auto auto 1fr;

  box-shadow: ${props =>
    `inset 0 60px 0 ${props.theme.colors.main.dark}, ${
      props.theme.shadows[2]
    }`};
  font-family: ${props => props.theme.fonts.freight};
  font-weight: 500;

  &:after {
    position: absolute;
    top: 60px;
    width: calc(${props => props.theme.frame.width});
    height: calc(${props => props.theme.frame.height});

    background-color: ${props => rgba(props.theme.colors.muted.dark, 0.85)};
    content: '';
    z-index: -1;
  }
`;

const StyledLogo = styled(Logo)`
  grid-column: 1;
  grid-row: 1 / span 2;
  padding-bottom: 12px;
  padding-left: 24px;
`;

const StyledSummaries = styled(Summaries)`
  grid-column: 2;
  grid-row: 1 / span 2;
  padding-bottom: 12px;
`;

const StyledTicker = styled(Ticker)`
  grid-column: 3;
  grid-row: 1 / span 2;
  padding-bottom: 12px;
`;

const Wrapper = styled.div`
  grid-column: 1 / span 3;
  grid-row: 2 / span 8;
  margin: 24px;
  padding: 112px 72px;
`;

const Title = styled.div`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.freight};
  font-size: 96px;
  font-weight: 700;
`;

const Dot = styled.span`
  color: ${props => props.theme.colors.main.avagreen};
`;

const Subtitle = styled.div`
  margin-top: 12px;
  margin-left: 4px;

  color: ${props => props.theme.colors.muted.lightbluegrey};
  font-family: ${props => props.theme.fonts.adelle};
  font-size: 24px;
  font-weight: 200;
`;

export default Scene;
