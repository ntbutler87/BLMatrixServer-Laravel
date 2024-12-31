import matrixSDK, { MatrixInput, MatrixOutput } from "../config/MatrixSDK";
import appSettings, { MatrixPort, getImage } from "../config/AppSettings";
import CommonStyles from "@/components2/CommonStyles";
import inputImage from '../assets/input.png';

interface PortStatus {
    port: MatrixInput;
    outputs: MatrixOutput[];
    disabled?: boolean;
    onPressF: Function;
    appPortConfig: MatrixPort;
}

export default function InputTile({ disabled, port, outputs,onPressF,appPortConfig }: PortStatus) {

    return (
        <div className="Tile" style={{...CommonStyles.Tile, ...(disabled) ? CommonStyles.Disabled : null}} onClick={ (disabled) ? () => {} : () => {onPressF(port)}}>
            <div style={{...CommonStyles.TilePortImageContainer, ...(disabled) ? CommonStyles.Disabled : null}}>
                <img style={{...CommonStyles.TilePortImage, ...(disabled) ? CommonStyles.Disabled : null}} src={getImage(port, appPortConfig)} />
            </div>
            <div style={CommonStyles.TilePortName}>{ (appPortConfig?.overrideName) ? appPortConfig.name : port.name}</div>
            <div style={{...CommonStyles.TilePortConnectionStatusConnectedText, ...(port.sig == 0 ? CommonStyles.TilePortConnectionStatusDisonnectedText : null)}}>
                {port.sig == 0 ? "Disconnected" : "Connected" }
            </div>
            <div style={CommonStyles.VerticalList}>
                <div> {/* Make this a scrollable div */}
                    {outputs?.map((val) => {
                        let joinedPort = matrixSDK.getJoinedOutputPort(val);
                        let joinedPortConfig = appSettings.getJoinedOutputPortConfig(val);
                        let portConfig = appSettings.getPortConfig(val);
                        let portName = (portConfig.overrideName) ? portConfig.name : val.name;
                        let joinedPortName = (joinedPortConfig.overrideName) ? joinedPortConfig.name : joinedPort.name;
                        if (portName !== joinedPortName){
                            portName += " / " + joinedPortName;
                        }
                        return <div key={val.port} style={{...CommonStyles.HorizontalList, flexWrap: 'nowrap'}} >
                            <img src={inputImage} style={CommonStyles.TilePortConnectionImage} />
                            <div style={CommonStyles.TilePortConnectionText}>{val.port}: {portName}</div>
                        </div>})}
                </div>
            </div>
        </div>
    );
}
