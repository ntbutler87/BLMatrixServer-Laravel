import hdmiImage from '../assets/hdmi.png';
import screenImage from '../assets/monitor.png';
import stopImage from '../assets/no-parking.png';
import projectorImage from '../assets/projector.png';
import tvImage from '../assets/television.png';
import streamImage from '../assets/video-player.png';
import settingImage from '../assets/setting.png';
import inputImage from '../assets/input.png';
import autoImage from '../assets/auto.png';

import oneImage from '../assets/one.png';
import twoImage from '../assets/two.png';
import threeImage from '../assets/three.png';
import fourImage from '../assets/four.png';
import fiveImage from '../assets/five.png';
import sixImage from '../assets/six.png';
import sevenImage from '../assets/seven.png';
import eightImage from '../assets/eight.png';
import cameraImage from '../assets/camera.png';
import checkedImage from '../assets/checked.png';
import churchImage from '../assets/church.png';
import guitarImage from '../assets/guitar.png';
import microphoneImage from '../assets/microphone.png';
import artImage from '../assets/modern-art.png';
import careImage from '../assets/social-care.png';
import tv2Image from '../assets/tv2.png';
import winnerImage from '../assets/winner.png';

const getImage = (name: string|null) => {
    var file;
    switch (name?.toLowerCase()){
        case "auto": file = autoImage; break;
        case "hdmi": file = hdmiImage; break;
        case "screen": file = screenImage; break;
        case "projector": file = projectorImage; break;
        case "tv": file = tvImage; break;
        case "stream": file = streamImage; break;
        case "setting": file = settingImage; break;
        case "stop": file = stopImage; break;
        case "input": file = inputImage; break;
        case "one": file = oneImage; break;
        case "two": file = twoImage; break;
        case "three": file = threeImage; break;
        case "four": file = fourImage; break;
        case "five": file = fiveImage; break;
        case "six": file = sixImage; break;
        case "seven": file = sevenImage; break;
        case "eight": file = eightImage; break;
        case "camera": file = cameraImage; break;
        case "checked": file = checkedImage; break;
        case "church": file = churchImage; break;
        case "guitar": file = guitarImage; break;
        case "microphone": file = microphoneImage; break;
        case "art": file = artImage; break;
        case "care": file = careImage; break;
        case "tv2": file = tv2Image; break;
        case "winner": file = winnerImage; break;
        default: file = hdmiImage;
    }
    return file;
};

interface Props {
    className?: string;
    image: string|null
}

export default function TileImage({
        className = '',
        image = null,
    }: Props) {

    return (
        <img
            className={className}
            src={getImage(image)}>
        </img>
    );
}
