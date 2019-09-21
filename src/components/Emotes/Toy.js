import React from 'react';
import { Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';

import styled from 'styled-components';

import Scene from './Scene';

PIXI.utils.skipHello();
const WIDTH = 1920;
const HEIGHT = 1080;

function Toy() {
  return (
    <Wrapper>
      <Stage width={WIDTH} height={HEIGHT} options={{ transparent: true }}>
        <Scene width={WIDTH} height={HEIGHT} />
      </Stage>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 1920px;
  height: 1080px;
`;

export default Toy;
