<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Models\Lead;
use Inertia\Inertia;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   
public function index(Request $request)
{
    $query = Lead::query();

    // Search by name and email
    if ($request->filled('search')) {
        $search = $request->search;
        $query->where(function($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }

    // Filter by status
    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    // Sort by created date
    $sortDirection = $request->get('sort', 'desc');
    $query->orderBy('created_at', $sortDirection);

    $leads = $query->paginate(10)->withQueryString();

    return Inertia::render('Leads/Index', [
        'leads' => $leads,
        'filters' => [
            'search' => $request->search,
            'status' => $request->status,
            'sort' => $sortDirection,
        ]
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
 public function create()
{
    return Inertia::render('Leads/Create');
}

    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:leads,email',
        'phone' => 'required|string',
        'status' => 'required|in:New,Contacted,Converted',
    ]);

    $validated['user_id'] = Auth::id();
    Lead::create($validated);

    return redirect()->route('leads.index');
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
 public function edit(Lead $lead)
{
    return Inertia::render('Leads/Edit', [
        'lead' => $lead
    ]);
}


    /**
     * Update the specified resource in storage.
     */
  public function update(Request $request, Lead $lead)
    {
        if (!Gate::allows('update', $lead)) {
            abort(403);
        }
        
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:leads,email,' . $lead->id,
            'phone' => 'required|string',
            'status' => 'required|in:New,Contacted,Converted',
        ]);

        $lead->update($validated);

        return redirect()->route('leads.index');
    }

    /**
     * Remove the specified resource from storage.
     */
 public function destroy(Lead $lead)
{
    if (!Gate::allows('delete', $lead)) {
        abort(403);
    }
    
    $lead->delete();

    return redirect()->route('leads.index');
}
}
