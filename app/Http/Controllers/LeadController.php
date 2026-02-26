<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lead;
use Inertia\Inertia;

class LeadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   
public function index(Request $request)
{
    $leads = Lead::orderBy('created_at', 'desc')
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Leads/Index', [
        'leads' => $leads
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
    $lead->delete();

    return redirect()->route('leads.index');
}
}
