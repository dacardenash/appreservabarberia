<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\Books\BookService;

class BookController extends Controller
{
    private $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }


    /**
     * @param Request $request
     * @return JsonResponse 
     */
    /*public function index(Request $request) : JsonResponse
    {
        //dd($request->all());
        return response()->json(Book::all());
    }*/

    /**
     * @param Request $request
     * @return JsonResponse 
     */
    public function index(Request $request) : JsonResponse
    {
        //dd($request->all());
        //return response()->json(Book::where('name', $request->name)->get());
        dd('Llego');
        return response()->json($this->bookService->index());
    }

    /**
     * @param int $id
     * @return JsonResponse 
     */
    public function show(int $id) : JsonResponse
    {
        return response()->json(Book::where('id', $id)->firstOrFail());
    }

    /**
     * @param int $id
     * @return JsonResponse 
     */
    public function destroy(int $id) : JsonResponse
    {
        return response()->json(Book::findOrfail($id)->delete(), 204);
    }

    /**
     * @param int $id
     * @return JsonResponse 
     */
    public function store(Request $request) : JsonResponse
    {
        $book = new Book();
        $book->language = $request->language;
        $book->name = $request->name;
        $book->pages = $request->pages;  
        $book->save();
        return response()->json($book);
    }

    /**
     * @param int $id
     * @return JsonResponse 
     */
    public function update(Request $request, int $id) : JsonResponse
    {
        $book = Book::findOrfail($id);
        $book->language = $request->language;
        $book->name = $request->name;
        $book->pages = $request->pages;  
        $book->save();
        return response()->json($book);
    }
}
