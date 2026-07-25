<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        return $posts->toJson();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inputs = $request->all();
        $post = new Post();
        $post->title = $inputs["title"];
        $post->description = $inputs["description"];
        $post->author = $inputs["author"];
        $post->save();
        return response(["seccess"=>"enregistrement effectuer"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Post::find($id);
        return $data->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $inputs = $request->all();
        $post = Post::find($id);
        $post->title = $inputs["title"];
        $post->description = $inputs["description"];
        $post->author = $inputs["author"];
        $post->update();
        return response(["Success"=>"Mise à jour effectuer"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post, $id)
    {
        $post->findOrFail($id)->delete();
        return response(["seccess"=>"supression effectuer"]);
    }
}
