/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import matrixSDK, { MatrixInput, MatrixOutput, MatrixStatus } from '@/config/MatrixSDK';
import { AppConfig, Macro } from '@/config/AppSettings';
import MacroTile from '@/components2/MacroTile';

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
  flexDirection: 'row' as 'row', 
  flexWrap: 'wrap' as 'wrap', 
  rowGap: 10,
}

function MacrosTab({matrixStatus, appConfig}: Props): React.JSX.Element {
  const recordingMacro: Macro | undefined = appConfig.Macro.find( (macro) => { return macro.isRecording } );

  const confirmRunMacro = (macro: Macro) => {
    const result = confirm("You are about to run the macro '" + macro.name + "'.\n\n Are you SURE you want to continue");
    if (result) {
      matrixSDK.runMacroCommand(macro.commands)
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {appConfig.Macro.slice(0,4).map((item) => {
          return <MacroTile
            key={"MACRO" + item.port}
            appPortConfig={appConfig.Macro[item.port-1]}
            disabled={!matrixStatus.isConnected || ( recordingMacro && item !== recordingMacro) }
            onPressF={confirmRunMacro} />
        }) }
      </div>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {appConfig.Macro.slice(4,8).map((item) => {
          return <MacroTile
            key={"MACRO" + item.port}
            appPortConfig={appConfig.Macro[item.port-1]}  
            disabled={!matrixStatus.isConnected || ( recordingMacro && item !== recordingMacro) }
            onPressF={confirmRunMacro} />
        }) }
      </div>
    </div>
  );
}

export default MacrosTab;
