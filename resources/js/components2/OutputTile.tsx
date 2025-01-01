import { MatrixInput, MatrixOutput } from "../config/MatrixSDK";
import { MatrixPort, getImage } from "../config/AppSettings";
import CommonStyles from "@/components2/CommonStyles";
import inputImage from '../assets/input.png';

interface PortStatus {
    port: MatrixOutput;
    input: MatrixInput | undefined;
    disabled?: boolean;
    onPressF: Function;
    appPortConfig: MatrixPort;
}

export default function OutputTile({ disabled, port, input, onPressF, appPortConfig }: PortStatus) {
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
                {(input) ? <div key={input.port} style={{...CommonStyles.HorizontalList, flexWrap: 'nowrap'}} >
                            <img src={inputImage} style={CommonStyles.TilePortConnectionImage} />
                            <div style={CommonStyles.TilePortConnectionText}>{input.port}: {input.name}</div>
                </div> : null}
            </div>
        </div>
    );
}
