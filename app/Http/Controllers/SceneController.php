<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Scene;

class SceneController extends Controller
{
    function index (Request $request): Response
    {
        return Inertia::render('Scene/List', [
            'scenes' => Scene::get()->all(),
        ]);
    }

    // function create (Request $request): Response
    // {
    //     return Inertia::render('Scene/Create');
    // }

    // function store (Request $request): RedirectResponse
    // {
    //     $validated = $request->validate([
    //         'name' => ['required', 'string'],
    //         'image' => ['sometimes', 'nullable', 'string'],
    //     ]);

    //     Scene::create($validated);

    //     return Redirect::route('scene.index');
    // }
    
    function edit (Request $request, Scene $scene): Response
    {
        return Inertia::render('Scene/Edit', [
            'scene' => $scene,
        ]);
    }

    function update (Request $request, Scene $scene): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'image' => ['sometimes', 'nullable', 'string'],
        ]);
        
        $scene->update($validated);

        return Redirect::route('scene.edit', ['scene' => $scene]);
    }

    // function destroy (Request $request, Scene $scene): RedirectResponse
    // {
    //     $scene->delete();

    //     return Redirect::route('scene.index');
    // }

}
