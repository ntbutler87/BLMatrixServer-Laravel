import React, { useState, useRef, useEffect } from 'react';
// import Share from 'react-native-share';
// import { btoa, atob } from 'react-native-quick-base64'
import matrixSDK from "@/config/MatrixSDK";
import appSettings, {  Macro, getImage } from "@/config/AppSettings";
// import DocumentPicker, {
//   DirectoryPickerResponse,
//   DocumentPickerResponse,
//   isCancel,
//   isInProgress,
//   types,
// } from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

import shareimg from  '@/assets/share.png';
import recordImg from '@/assets/record.png';
import recordingimg from '@/assets/recording.png';
import playimg from '@/assets/play-button.png';
import importimg from '@/assets/import.png';

interface PortStatus {
    onPressF: Function;
    appPortConfig: Macro;
    disabled?: boolean;
}

export interface MacroExport {
    name: string,
    iconIndex: number,
    type: 'Macro',
    commands: string,
}


const btn = {
    display: 'flex',
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowRadius: 5,
    shadowColor: 'rgb(20,20,20)',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.7,
    width: 300,
    height: 300,
}
const connected = {
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: 'rgb(200,240,200)',
}
const connectedText = {
    color: '#24D015', 
    alignSelf: 'center',
    // fontStyle:'italic',
    fontSize: 14,
    textAlignVertical: 'center'
}
const headerText = {
    display: 'flex',
    flex: 1,
    color: '#303030', 
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600'
}
const headerInput = {
    borderWidth: 1,
    borderColor: 'rgba(100,100,100,1)',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
}
const inputText = {
    display: 'flex',
    color: '#303030', 
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    margin: 5,
}
const outputItem = {
    display: 'flex',
    flex:1,
}
const outputText = {
    display: 'flex',
    flex:3,
    color: '#303030', 
    fontSize: 13,
    fontWeight: '400',
}
const portimg = {
    flex: 1,
    width: 15,
    height: 15,
    alignSelf: 'center',
}
const portDisconnected = {
    color: '#E31010',
}
const inputIconContainer = {
    display: 'flex',
    flex: 2,
    width: 100,
    maxHeight: 100,
    padding: 10,
    margin: 15,
    borderRadius: 100,
    backgroundColor: '#E8F6FF',
    alignSelf: 'center',
}
const inputIcon = {
    display: 'flex',
    width: 80,
    height: 80,
    alignSelf: 'center',
}
const outputList = {
    display: 'flex',
    flex:1, 
    flexDirection: 'column' as 'column',
    justifyContent: 'flex-start',
}
const outputListItem = {
    display: 'flex',
    // flex: 1,
    flexDirection: 'row' as 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
}
const isDisabled = {
    backgroundColor: '#aaa',
    opacity: 0.6,
}
const actions = {
    display: 'flex',
    flex: 2,
    flexDirection: 'row' as 'row',
    justifyContent: 'space-around',
}
const actionimg = {
    display: 'flex',
    flex: 1,
    width: 50,
    height: 50,
    alignSelf: 'center',
    resizeMode: 'contain',
}
const imagePicker = {
    display: 'flex',
    columnGap:5,
    borderTopColor: '#006DB2',
    borderBottomColor: '#006DB2',
    borderTopWidth: 1,
    borderBottomWidth: 1,
}
const shareimgContainer = {
    display: 'flex',
    zIndex:2,
    position: 'absolute' as 'absolute',
    top: 5,
    right: 2,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F6FF',
}
const importimgContainer = {
    display: 'flex',
    zIndex:2,
    opacity: 0.5,
    position: 'absolute' as 'absolute',
    top: 5,
    left: 2,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F6FF',

}
const shareimgStyle = {
    width: 25,
    height: 25,
    resizeMode: 'contain',
}

export default function MacroTile({ onPressF, appPortConfig, disabled }: PortStatus) {
    const [nameInput, setNameInput] = useState<string>((appPortConfig?.name) ? appPortConfig.name : '');
    const [editingName, setEditName] = useState<boolean>(false);
    const [pickimg, setPickimg] = useState<boolean>(false);
    
    const  confirmOutputControl = () => {
        const disableControl = confirm("Do you want to disable output control whilst recording the macro? This will allow you to record a macro without actually making changes to the matrix");
        appSettings.startRecordingMacro(appPortConfig, disableControl);
    }

    const confirmRecord = () => {
        const confirmProceed = confirm("Proceeding will erase and overwrite this macro'.\n\n Are you SURE you want to continue?");
        if (confirmProceed) {
            confirmOutputControl();
        }
    }

    // const shareMethodPrompt = async () => {
    //     Alert.alert(
    //         "",
    //         "Do you want to AirDrop the config, or save as a JSON file?",
    //         [
    //           {
    //             text: 'AirDrop',
    //             style: 'default',
    //             onPress: () => {
    //                 shareMacro("AirDrop");
    //             },
    //           },
    //           {
    //             text: 'Store JSON',
    //             onPress: () => {
    //                 shareMacro("File");
    //             },
    //             style: 'default',
    //           },
    //           {
    //             text: 'Cancel',
    //             style: 'cancel',
    //           },
    //         ],
    //         {
    //           cancelable: true,
    //           onDismiss: () => {}
    //         },  
    //     );

    // }

    // const shareMacro = async (method: "AirDrop" | "File") => {
    //     let macroFileString = "data:application/json;base64,";
    //     let macroObject = {
    //         name: (appPortConfig.name) ? appPortConfig.name : 'New Macro',
    //         iconIndex: appPortConfig.imageIndex,
    //         type: 'Macro',
    //         commands: appPortConfig.commands,
    //     }
    //     var base64encodedFile = btoa ( JSON.stringify(macroObject) );
    //     // console.log(base64encodedFile);
    //     macroFileString += base64encodedFile;
    //     let macroURL = "blmatrixapp://import/" + base64encodedFile;
        
    //     try {
    //         switch (method) {
    //             case "AirDrop":
    //                 Share.open({
    //                     url: macroURL
    //                 })
    //                     .catch((err) => {
    //                         err && console.log(err);
    //                     });
    //                 break;
    //             case "File":
    //                 Share.open({
    //                     filename: 'Macro.json',
    //                     url: macroFileString
    //                 })
    //                     .catch((err) => {
    //                         err && console.log(err);
    //                     });
    //                 break;
    //         }
                
    //     } catch (error: any) {
    //         Alert.alert(error.message);
    //     }
    // }

    // const importMacro = async () => {
    //     try {
    //         const pickerResult = await DocumentPicker.pickSingle({
    //             presentationStyle: 'fullScreen',
    //             copyTo: 'cachesDirectory',
    //             type: types.json,
    //         });
    //         const fileContent = await RNFS.readFile(decodeURIComponent(pickerResult.uri), 'utf8');
    //         const newMacro = JSON.parse(fileContent);
    //         appSettings.importMacro(appPortConfig, newMacro);
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <div style={{...btn, ...((disabled) ? isDisabled : null) }}>
            <div style={{...importimgContainer}} onClick={() => {}}>
                <img style={{...shareimgStyle}} src={importimg} />
            </div> 
            {(appPortConfig.commands.length > 0) ? 
            <div style={{...shareimgContainer}} onClick={() => {}}>
                <img style={{...shareimgStyle}} src={shareimg} />
            </div> : null}
            {/* {(pickimg) ? <imgPicker 
                horizontal={true}
                style={styles.imagePicker}
                onSelect={(image: imgSourcePropType, index: number) => {setPickimg(false); appSettings.setPortimgIndex(appPortConfig, index)}}/> : */}
                <div 
                    style={{...inputIconContainer}}
                    onClick={() => {setPickimg(true)}}>
                    <img style={{...inputIcon, ...((disabled) ? isDisabled : null)}} src={getImage(appPortConfig, appPortConfig)} />
                </div>
            {/* } */}
            <div style={{display: 'flex', flex:1}} onClick={() => {setEditName(!editingName); }}>
                {(editingName) ? 
                    // <input 
                    //     style={{...headerText, ...headerInput}} 
                    //     defaultValue={appPortConfig?.name} 
                    //     value={nameInput}
                    //     onChange={setNameInput}
                    //     onBlur={ () => {appSettings.overridePortName(appPortConfig, true, nameInput);} }/>
                    <></>
                    : <span style={{...headerText}}>{appPortConfig.name}</span>} 
                {/* <Text style={[styles.headerText]}>{appPortConfig.name}</Text> */}
            </div>
            <div style={{...actions}}>
                { (!appPortConfig.isRecording) ? 
                    <div onClick={confirmRecord} >
                        <img src={recordImg} style={{...actionimg, ...((disabled) ? isDisabled : null)}} /></div>
                    : <div onClick={ () => { appSettings.saveMacro(appPortConfig); } } >
                        <img src={recordingimg} style={{...actionimg, ...(disabled) ? isDisabled : null}} /></div>
                }
                { 
                    (!appPortConfig.isRecording && appPortConfig.commands.length > 0) ? 
                    <div onClick={() => {onPressF(appPortConfig)}} >
                        <img src={playimg} style={{...actionimg, ...((disabled) ? isDisabled : null)}} /></div> : null}
                
            </div>
        </div>
    );
}
