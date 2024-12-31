import { MatrixInput } from "../config/MatrixSDK";

import hdmiImage from '../assets/hdmi-port.png';

interface PortStatus {
    port: MatrixInput;
    disabled?: boolean;
}

const btn = {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderStyle: 'dashed',
      borderWidth: 1,
      backgroundColor: 'rgb(240,240,240)',
};
const connected = {
        borderStyle: 'solid',
        borderWidth: 2,
        backgroundColor: 'rgb(200,240,200)',
};
const connectedText = {
        fontStyle:'italic',
        fontSize: 9,
        textAlignVertical: 'center'
};
const headerText = {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600'
};
const portImage = {
        width: 15,
        height: 15,
};
const portDisconnected = {
        opacity: 0.6,
};

export default function InputPort({ disabled, port }: PortStatus) {
    return (
        <div 
            style={{...btn, ...(port.sig == 1 ? connected : null)}}>
            <p style={headerText}>Input {port.port}</p>
            <p>{port.name}</p>
            <p style={{...connectedText, ...(port.sig == 0 ? portDisconnected : null)}}>
                <img src={hdmiImage} style={portImage} /> {port.sig == 0 ? "Not" : null } Connected
            </p>
        </div>
    );
}
