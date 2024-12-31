import { MatrixScene } from "../config/MatrixSDK";
import { MatrixPreset, getImage } from "../config/AppSettings";
import CommonStyles from "@/components2/CommonStyles";

interface PortStatus {
    port: MatrixScene;
    onPressF: Function;
    appPortConfig: MatrixPreset;
    disabled?: boolean;
}

export default function SceneTile({ port, onPressF, appPortConfig, disabled }: PortStatus) {
    return (
        <div className="Tile" style={{...CommonStyles.Tile, paddingTop: '2em', paddingBottom: '1em', justifyContent:'space-between', ...(disabled) ? CommonStyles.Disabled : null}} onClick={ (disabled) ? () => {} : () => {onPressF(port)}}>
            <div style={{...CommonStyles.TilePortImageContainer, ...CommonStyles.TilePortImageContainerLarge, ...(disabled) ? CommonStyles.Disabled : null}}>
                <img style={{...CommonStyles.TilePortImage, ...(disabled) ? CommonStyles.Disabled : null}} src={getImage(port, appPortConfig)} />
            </div>
            <div style={{...CommonStyles.TilePortName, fontSize: 20}}>{ (appPortConfig?.overrideName) ? appPortConfig.name : (port.name != '' ? port.name : `Scene ${port.port}`) }</div>
        </div>
    );
}
