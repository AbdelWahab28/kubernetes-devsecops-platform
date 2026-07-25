<?php
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get("/allpost", [PostController::class, "index"]);
Route::get("/showArticle/{id}", [PostController::class, "show"]);
Route::post("/postsArticle", [PostController::class, "store"]);
Route::delete("/deleteArticle/{id}", [PostController::class, "destroy"]);
Route::put("/updateArticle/{id}", [PostController::class, "update"]);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// test pipeline backend mar. 30 juin 2026 13:48:45 EAT
// test pipeline backend mer. 01 juil. 2026 11:21:22 EAT
// fix deploy backend mer. 01 juil. 2026 12:01:12 EAT
// pipeline complet backend mer. 01 juil. 2026 13:07:08 EAT
// restart general jeu. 02 juil. 2026 11:08:06 EAT
