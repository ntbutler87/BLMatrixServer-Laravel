/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import matrixSDK, { MatrixInput, MatrixOutput, MatrixStatus } from '@/config/MatrixSDK';
import { AppConfig, Macro } from '@/config/AppSettings';
import InputTile from '@/components2/InputTile';
import OutputSelectTile from '@/components2/OutputSelectTile';

interface Props {
  matrixStatus: MatrixStatus;
  appConfig: AppConfig;
}

const mainContainer = {
  flex: 1,
  backgroundColor: '#006DB2',
  justifyContent: 'space-around', 
  alignItems:'center',
  alignContent: 'center',
  flexDirection: 'row', 
  flexWrap: 'wrap', 
  rowGap: 10,
}
const outputMapper = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  placeItems: 'center',
  placeContent: 'center',
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: 10,
}
const outputMapperInner = {
  display: 'flex',
  padding: 40,
  marginHorizontal: 150,
  marginVertical: 40,
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(245,245,245)',
  borderRadius: 10,
  shadowRadius: 15,
  shadowColor: 'rgb(20,20,20)',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.7,
}
const outputMapperTitle = {
  display: 'flex',
  fontSize: 28,
  fontWeight: '600',
  padding: 10,
  paddingBottom: 30,
  alignSelf: 'center',
}
const outputMapperList = {
  display: 'flex',
  flexDirection:'column' as 'column',
  flexGrow:1,
  // width:600,
  rowGap: 10,
}
const highlight = {
  fontWeight: '700',
}
const btn = {
  display: 'flex',
  flexDirection:'row' as 'row',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const saveBtn = { 
  backgroundColor: '#00568C', 
  justifyContent: 'center' 
}
const saveBtnText = { 
  color: '#fff', 
  fontSize:18,
  fontWeight: '700' 
}
const cancelBtn = { 
  backgroundColor: '#E8F6FF', 
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: '#83CBFA',
}
const cancelBtnText = { 
  color: '#0496FF', 
  fontSize:18,
  fontWeight: '700' 
}
const btnText = {
    color: '#00568C',
}
const input = {
  padding: 15,
  height: 100,
  borderColor: 'rgba(0, 0, 0, 0.2)',
  borderWidth: 1,
  borderRadius: 5,
  marginBottom: 20,
}


function InputTab({matrixStatus, appConfig}: Props): React.JSX.Element {
  const [selectedInput, setSelectedInput] = useState<MatrixInput | null>(null);
  const [selectedOutputs, setSelectedOutputs] = useState<MatrixOutput[]>([]);
  const [currentOutputs, setCurrentOutputs] = useState<MatrixOutput[]>([]);
  const [selectingOutputs, setOutputSelect] = useState<boolean>(false);

  const recordingMacro: Macro | undefined = appConfig.Macro.find( (macro) => { return macro.isRecording } );

  const initiateSelectedOutputs = (input: MatrixInput) => {
    let currentOutputs = matrixStatus?.HDMI_OUT.filter((val) => { return val.input == input.port });
    if (!currentOutputs) {
      currentOutputs = [];
    }
    setSelectedOutputs([...currentOutputs]);
    setCurrentOutputs([...currentOutputs]);
  }

  const toggleItemSelect = (output: MatrixOutput) => {
    if (selectedOutputs.includes(output)) {
      setSelectedOutputs(selectedOutputs => selectedOutputs.filter(item => item.port !== output.port));
    } else {
      setSelectedOutputs(selectedOutputs => [...selectedOutputs, output]);
    }
  };

  const popupOutputMapper = (input: MatrixInput) => {
    setSelectedInput(input);
    initiateSelectedOutputs(input);
    setOutputSelect(true);
  }
  const closeOutputMapper = () => {
    setOutputSelect(false);
  }

  const commitOutputMapping = () => {
    var outputs: Array<number> = [];
    for (var i=0; i<selectedOutputs.length; i++){
      outputs.push(selectedOutputs[i].port);
    }
    if (selectedInput)
      matrixSDK.setOutputSourceMultiple(selectedInput?.port, outputs);
    closeOutputMapper();
  }

  const outputMapperComponent = () => {
    return (
      <div style={{...outputMapper}}>
        <div style={{...outputMapperInner}}>
          <div style={{...outputMapperList}}>
            <span style={{...outputMapperTitle}}>Input {selectedInput?.port}: {selectedInput?.name}</span>
            {matrixStatus.HDMI_OUT.map((item) => {
              return <OutputSelectTile
                key={"OUTPUTSELECT" + item.port}
                port={item}
                portConfig={appConfig.HDMI_OUT[item.port-1]}
                selected={selectedOutputs.includes(item)}
                currentPatched={currentOutputs.includes(item)}
                onPress={toggleItemSelect}
                // style={{}}
                recordingMacro={recordingMacro !== undefined} />
            }) }
            <div style={{...btn,...saveBtn}}   onClick={commitOutputMapping}><span style={{...btnText,...saveBtnText}}>Save</span></div>
            <div style={{...btn,...cancelBtn}} onClick={closeOutputMapper}  ><span style={{...btnText,...cancelBtnText}}>Cancel</span></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    {(selectingOutputs) ? outputMapperComponent() : null}
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {matrixStatus.HDMI_IN.slice(0,4).map( (data) => {
            return <InputTile 
              key={"HDMI_IN" + data.port}
              disabled={!matrixStatus.isConnected}
              port={data}
              onPressF={popupOutputMapper}
              outputs={matrixStatus?.HDMI_OUT.filter((val) => { return val.input == data.port })}
              appPortConfig={appConfig?.HDMI_IN[data.port - 1]}
              
            />
          } )}
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {matrixStatus.HDMI_IN.slice(4,8).map( (data) => {
            return <InputTile 
              key={"HDMI_IN" + data.port}
              disabled={!matrixStatus.isConnected}
              port={data}
              onPressF={popupOutputMapper}
              outputs={matrixStatus?.HDMI_OUT.filter((val) => { return val.input == data.port })}
              appPortConfig={appConfig?.HDMI_IN[data.port - 1]}
              
            />
          } )}
        </div>
      </div>
    </>
  );
}

export default InputTab;
