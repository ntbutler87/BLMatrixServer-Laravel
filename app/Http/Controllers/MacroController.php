<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Macro;

class MacroController extends Controller
{
    function index (Request $request): Response
    {
        return Inertia::render('Macro/List', [
            'macros' => Macro::get()->all(),
        ]);
    }

    function create (Request $request): Response
    {
        return Inertia::render('Macro/Create');
    }

    function store (Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'slot' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:8'],
            'image' => ['sometimes', 'nullable', 'string'],
            'commands' => ['sometimes', 'nullable', 'string'],
        ]);

        Macro::create($validated);

        return Redirect::route('macro.index');
    }
    
    function edit (Request $request, Macro $macro): Response
    {
        return Inertia::render('Macro/Edit', [
            'macro' => $macro,
        ]);
    }

    function update (Request $request, Macro $macro): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'slot' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:8'],
            'image' => ['sometimes', 'nullable', 'string'],
            'commands' => ['sometimes', 'nullable', 'string'],
        ]);

        $macro->update($validated);

        return Redirect::route('macro.edit', ['macro' => $macro]);
    }

    function destroy (Request $request, Macro $macro): RedirectResponse
    {
        $macro->delete();

        return Redirect::route('macro.index');
    }

}
