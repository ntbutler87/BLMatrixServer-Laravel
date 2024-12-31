/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';

import matrixSDK, { MatrixInput, MatrixOutput, MatrixStatus } from '@/config/MatrixSDK';
import { AppConfig } from '@/config/AppSettings';
import SceneTile from '@/components2/SceneTile';

interface Props {
  matrixStatus: MatrixStatus;
  appConfig: AppConfig;
}

const mainContainer = {
  display: 'flex',
  flex: 1,
  backgroundColor: '#006DB2',
  justifyContent: 'space-around',
  alignItems:'center',
  alignContent: 'center',
  flexDirection: 'row', 
  flexWrap: 'wrap', 
  rowGap: 10,
}


function ScenesTab({matrixStatus, appConfig}: Props): React.JSX.Element {

  const confirmScene = (portNumber: number) => {
    const result = confirm("You are about to load a new configuration.\n\n This process can take 15-20 seconds.\n\n Are you SURE you want to continue?");
    if (result) {
      matrixSDK.manageScene(portNumber, "load");
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {matrixStatus.Scenes.slice(0,4).map( (item) => {
            return <SceneTile 
              key={"SCENESELECT" + item.port}
              port={item}
              appPortConfig={appConfig.Scene[item.port-1]}
              disabled={!matrixStatus.isConnected}
              onPressF={() => {confirmScene(item.port)}}
            />
          } )}
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {matrixStatus.Scenes.slice(4,8).map( (item) => {
            return <SceneTile 
              key={"SCENESELECT" + item.port}
              port={item}
              appPortConfig={appConfig.Scene[item.port-1]}
              disabled={!matrixStatus.isConnected}
              onPressF={() => {confirmScene(item.port)}}
            />
          } )}
        </div>
      </div>
  );
}

export default ScenesTab;
