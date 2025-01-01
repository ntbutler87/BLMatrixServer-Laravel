<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\UpdateMacroCommandsRequest;
use App\Models\Macro;

class MacroController extends Controller
{
    
    function updateMacroCommands (UpdateMacroCommandsRequest $request, Macro $macro)
    {
        $macro->update($request->valudated());
        return Redirect::back();
    }
}
