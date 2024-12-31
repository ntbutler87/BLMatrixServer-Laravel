import { MatrixOutput } from "../config/MatrixSDK";
import { Alert } from "@mui/material";
import { MatrixPort } from "../config/AppSettings";

interface PortStatus {
    port: MatrixOutput;
    portConfig: MatrixPort;
    selected: boolean;
    onPress: Function;
    currentPatched: boolean;
    // style?: StyleProp<ViewStyle>;
    recordingMacro?: boolean;
}


const container = {
    display: 'flex',
    flexDirection:'row' as 'row',
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const text ={
    fontSize:11,
    color: '#777',
};

const selectedContainer ={
    borderWidth: 2,
    borderColor: '#00568C',
};

const selectedText = {
    color: '#00568C',
};

const currentPatchedContainer ={
    borderWidth: 2,
    borderColor: '#72f2b0',
};

const currentPatchedText ={
    color: '#72f2b0',
};

export default function OutputSelectTile({ port, portConfig, selected, onPress, currentPatched, recordingMacro = false }: PortStatus) {
    const alertCannotChange = () => {
        // Alert.alert(
        //     "Already Patched",
        //     "You can't de-select an input that's already patched here.\n\nSelect another output and patch it there instead.",
        //     [
        //     {
        //         text: 'OK',
        //         style: 'default',
        //     },
        //     ],
        //     {
        //     cancelable: true,
        //     onDismiss: () => {}
        //     },
        // );
    }

    return (
        <div 
            style={{...container, ...((selected) ? selectedContainer : null),...((currentPatched && !recordingMacro) ? currentPatchedContainer : null)}}
            onClick={(currentPatched && !recordingMacro) ? alertCannotChange: () => {onPress(port)}}
            >
            <span style={{...text,...((selected) ? selectedText : null)}}>
                {port.port}: { (portConfig.overrideName) ? portConfig.name : port.name}
            </span>
            {(selected) ? <span style={{...selectedText, ...((currentPatched) ? currentPatchedText : null)}}>{ (currentPatched) ? "Patched" : "Selected"}</span> : null}
        </div>
    );
}
