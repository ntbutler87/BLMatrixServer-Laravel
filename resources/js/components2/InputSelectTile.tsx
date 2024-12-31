import { MatrixInput, MatrixOutput } from "../config/MatrixSDK";
import { MatrixPort } from "../config/AppSettings";
import { FullscreenExit } from "@mui/icons-material";

const container = {
    display: 'flex',
    flexDirection: 'row' as 'row',
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
};
const text ={
    fontSize:11,
    color: '#777',
};
const selectedContainer = {
    borderWidth: 2,
    borderColor: '#00568C',
};
const selectedText = {
    color: '#00568C',
};

interface PortStatus {
    port: MatrixInput;
    portConfig: MatrixPort;
    selected: boolean;
    onPress: Function;
}

export default function InputSelectTile({ port, portConfig, selected, onPress }: PortStatus) {
    return (
        <div 
            style={{...container, ...(selected) ? selectedContainer : null}}
            onClick={ (selected) ? () => {} : () => {onPress(port)}}
            >
            <div style={{...text, ...(selected) ? selectedText : null}}>
                {port.port}: { (portConfig.overrideName) ? portConfig.name : port.name}
            </div>
            {(selected) ? <div style={selectedText}>Selected</div> : null}
        </div>
    );
}
