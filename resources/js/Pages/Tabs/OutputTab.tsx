/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useRef, useEffect } from 'react';
import matrixSDK, { MatrixInput, MatrixOutput, MatrixStatus } from '@/config/MatrixSDK';
import { AppConfig } from '@/config/AppSettings';
import OutputTile from '@/components2/OutputTile';
import InputSelectTile from '@/components2/InputSelectTile';

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
  alignSelf: 'center',
}
const outputMapperDescription = {
  display: 'flex',
  fontSize: 16,
  fontWeight: '300',
  fontStyle: 'italic',
  // padding: 10,
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

function OutputTab({matrixStatus, appConfig}: Props): React.JSX.Element {
  const [selectedInput, setSelectedInput] = useState<MatrixInput | null>(null);
  const [selectedOutput, setSelectedOutput] = useState<MatrixOutput | null>(null);
  const [selectingOutputs, setOutputSelect] = useState<boolean>(false);

  const toggleItemSelect = (input: MatrixInput) => {
    setSelectedInput(input);
  };

  const popupOutputMapper = (output: MatrixOutput) => {
    setSelectedOutput(output);
    setSelectedInput(matrixStatus.HDMI_IN[output.input-1]);
    setOutputSelect(true);
  }
  const closeOutputMapper = () => {
    setOutputSelect(false);
  }

  const commitOutputMapping = () => {
    if (selectedInput && selectedOutput) {
      matrixSDK.setOutputSource(selectedOutput.port, selectedInput.port);
      closeOutputMapper();
    }
  }


  const outputMapperComponent = () => {
    return (
      <div style={{...outputMapper}}>
        <div style={{...outputMapperInner}}>
          <div style={{...outputMapperList}}>
            <span style={{...outputMapperTitle}}>Output {selectedOutput?.port}: {selectedOutput?.name}</span>
            <span style={{...outputMapperDescription}}>Select the input to route to this output</span>
            {matrixStatus.HDMI_IN.map((item) => {
              return <InputSelectTile
                key={"INPUTSELECT" + item.port}
                port={item}
                portConfig={appConfig.HDMI_IN[item.port-1]}
                selected={selectedInput === item}
                onPress={toggleItemSelect} />
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
          {matrixStatus.HDMI_OUT.slice(0,4).map( (item) => {
            return <OutputTile 
              key={"OUTPUTTILE" + item.port}
              port={item}
              input={matrixStatus.HDMI_IN[item.input -1]}
              appPortConfig={appConfig.HDMI_OUT[item.port-1]}
              disabled={!matrixStatus.isConnected}
              onPressF={popupOutputMapper}
            />
          } )}
        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {matrixStatus.HDMI_OUT.slice(4,8).map( (item) => {
            return <OutputTile 
              key={"OUTPUTTILE" + item.port}
              port={item}
              input={matrixStatus.HDMI_IN[item.input -1]}
              appPortConfig={appConfig.HDMI_OUT[item.port-1]}
              disabled={!matrixStatus.isConnected}
              onPressF={popupOutputMapper}
              
            />
          } )}
        </div>
      </div>
    </>
  );
}

export default OutputTab;
