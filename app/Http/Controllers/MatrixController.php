<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\UpdateMatrixSettingsRequest;
use App\Models\Matrix;

class MatrixController extends Controller
{
    //
    function get_status (Request $request)
    {
        $url = "http://" . config('matrix.ip') . ":" . config('matrix.port') . "/all_dat.get";
        // dd($url);
        $response = Http::get($url);
        return $response->body();
    }

    function set_video (Request $request): RedirectResponse
    {
        $url = "http://" . config('matrix.ip') . ":" . config('matrix.port') . "/video.set";
        $response = Http::withBody($request->body, 'text/plain;charset=UTF-8')->post($url);
        if (! $response->successful()) {
            return $response;
        }
        return Redirect::back();
    }

    function updateMatrixSettings (UpdateMatrixSettingsRequest $request, Matrix $matrix)
    {
        $matrix->update($request->validated());
        return Redirect::back();
    }

    private static function parse_status_string (string $status)
    {
        if ($status == null){ return; }

        $parsedState = new \StdClass;
        $parsedState->HdmiInputs = new \StdClass;
        $parsedState->HdmiOutputs = new \StdClass;
        $parsedState->HdbtOutputs = new \StdClass;
        $parsedState->Scenes = new \StdClass;
        for ($i = 1; $i <= 8; $i++){
            $parsedState->HdmiInputs->$i  = (object)["port" => $i, "name" => "HDMI In $i", "output" => $i, "pw5v" => null,"sig" => null,"rat" => null,"col" => null,"hdcp" => null,"bit" => null];
            $parsedState->HdmiOutputs->$i = (object)["port" => $i, "name" => "HDMI Out $i", "input" => $i];
            $parsedState->HdbtOutputs->$i = (object)["port" => $i, "name" => "HDBT Out $i", "input" => $i];
            $parsedState->Scenes->$i = (object)["name" => "Scene $i"];
        }
        
        
        // Parsing code taken from the amazing built-in webpage of the device...

        // Take the odd encoding of the string, split it into sections and tidy up for processing
        $sections   = explode(";",$status);
        $sw_info    = array_slice($sections,0,48);
        $edid_info  = array_slice($sections,48,40);
        $port_name  = array_slice($sections,88,24);
        $scene_name = array_slice($sections,112,8);
        $login_info = array_slice($sections,120,16);
        $input_info = array_slice(explode(";",str_replace('INPORT:','',$status)),      136, 8);
        $hdmi_info  = array_slice(explode(";",str_replace('OUTHDMIPORT:','',$status)), 144, 8);
        $hdbt_info  = array_slice(explode(";",str_replace('OUTHDBTPORT:','',$status)), 152, 8);

        // // Input > Output matching
        $outputStatuses = array_filter($sw_info, function ($str) {return str_starts_with($str, "VO"); });
        foreach ($outputStatuses as $status) {
            $outputID = intval( str_replace( 'IN','', explode(":", $status)[1] ) );
            $inputID = intval( explode(":", $status)[2] );
            $parsedState->HdmiInputs->$inputID->output = $outputID;
            $parsedState->HdmiOutputs->$outputID->input = $inputID;
            $parsedState->HdbtOutputs->$outputID->input = $inputID;
        }

        // Output Port status:
        for ($i = 1; $i <= 8; $i++){
            // Port names
            $parsedState->HdmiInputs->{$i}->name  = explode(":", $port_name[$i-1])[1];
            $parsedState->HdmiOutputs->{$i}->name = explode(":", $port_name[7 + $i])[1];
            $parsedState->HdbtOutputs->{$i}->name = explode(":", $port_name[15 + $i])[1];

            // Input Port current state
            $portInfoArray = explode(",", $input_info[$i-1]);
            $parsedState->HdmiInputs->{$i}->pw5v = intval( explode("=", $portInfoArray[0])[1] );
            $parsedState->HdmiInputs->{$i}->sig  = intval( explode("=", $portInfoArray[1])[1] );
            $parsedState->HdmiInputs->{$i}->rat  = intval( explode("=", $portInfoArray[2])[1] );
            $parsedState->HdmiInputs->{$i}->col  = intval( explode("=", $portInfoArray[3])[1] );
            $parsedState->HdmiInputs->{$i}->hdcp = intval( explode("=", $portInfoArray[4])[1] );
            $parsedState->HdmiInputs->{$i}->bit  = intval( explode("=", $portInfoArray[5])[1] );

            // HDMI Output Port current states
            $HDMIportInfoArray = explode(",", $hdmi_info[$i-1]);
            $parsedState->HdmiOutputs->{$i}->hpd  = intval( explode("=", $HDMIportInfoArray[0])[1] );
            $parsedState->HdmiOutputs->{$i}->sig  = intval( explode("=", $HDMIportInfoArray[1])[1] );
            $parsedState->HdmiOutputs->{$i}->rat  = intval( explode("=", $HDMIportInfoArray[2])[1] );
            $parsedState->HdmiOutputs->{$i}->col  = intval( explode("=", $HDMIportInfoArray[3])[1] );
            $parsedState->HdmiOutputs->{$i}->hdcp = intval( explode("=", $HDMIportInfoArray[4])[1] );
            $parsedState->HdmiOutputs->{$i}->bit  = intval( explode("=", $HDMIportInfoArray[5])[1] );
            
            // HDBT Output Port current states
            $HDBTportInfoArray = explode(",", $hdbt_info[$i-1]);
            $parsedState->HdbtOutputs->{$i}->hpd  = intval( explode("=", $HDBTportInfoArray[0])[1] );
            $parsedState->HdbtOutputs->{$i}->sig  = intval( explode("=", $HDBTportInfoArray[1])[1] );
            $parsedState->HdbtOutputs->{$i}->rat  = intval( explode("=", $HDBTportInfoArray[2])[1] );
            $parsedState->HdbtOutputs->{$i}->col  = intval( explode("=", $HDBTportInfoArray[3])[1] );
            $parsedState->HdbtOutputs->{$i}->hdcp = intval( explode("=", $HDBTportInfoArray[4])[1] );
            $parsedState->HdbtOutputs->{$i}->bit  = intval( explode("=", $HDBTportInfoArray[5])[1] );

            // Scene names
            $parsedState->Scenes->{$i}->name = explode(":", $scene_name[$i - 1])[1];
        }

        return $parsedState;
    }
}
