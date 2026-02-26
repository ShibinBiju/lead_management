import { usePage, Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Index({ auth }) {
    const { leads, filters } = usePage().props;
    const [search, setSearch] = useState(filters?.search || "");
    const [status, setStatus] = useState(filters?.status || "");
    const [sort, setSort] = useState(filters?.sort || "desc");
    const [alert, setAlert] = useState(null);

    const canEditLead = (lead) => {
        // Demo: Only allow editing leads created by the current user
        // Uncomment the line below to test the alert functionality
        return lead.user_id === auth.user.id;
        // For now, allow all authenticated users to edit
        // return true;
    };

    const canDeleteLead = (lead) => {
        // Demo: Only allow deleting leads created by the current user
        // Uncomment the line below to test the alert functionality
        return lead.user_id === auth.user.id;
        // For now, allow all authenticated users to delete
        // return true;
    };

    const handleEditClick = (lead) => {
        if (!canEditLead(lead)) {
            setAlert({
                type: 'error',
                message: 'You do not have permission to edit this lead.'
            });
            setTimeout(() => setAlert(null), 3000);
            return;
        }
        router.visit(route('leads.edit', lead.id));
    };

    const handleDeleteClick = (lead) => {
        if (!canDeleteLead(lead)) {
            setAlert({
                type: 'error',
                message: 'You do not have permission to delete this lead.'
            });
            setTimeout(() => setAlert(null), 3000);
            return;
        }
        
        if (confirm('Are you sure you want to delete this lead?')) {
            router.delete(route('leads.destroy', lead.id));
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                route("leads.index"),
                { search, status, sort },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [search, status, sort]);

    const handleSort = () => {
        setSort(sort === "desc" ? "asc" : "desc");
    };

    const clearFilters = () => {
        setSearch("");
        setStatus("");
        setSort("desc");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Leads
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {/* Alert */}
                        {alert && (
                            <div className={`mb-4 p-4 rounded-md ${
                                alert.type === 'error' 
                                    ? 'bg-red-50 border border-red-200 text-red-700' 
                                    : 'bg-green-50 border border-green-200 text-green-700'
                            }`}>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        {alert.type === 'error' ? (
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium">{alert.message}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between items-center mb-6">
                            <Link
                                href={route("leads.create")}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Create Lead
                            </Link>
                        </div>

                        {/* Filters Section */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label
                                        htmlFor="search"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Search (Name/Email)
                                    </label>
                                    <input
                                        id="search"
                                        type="text"
                                        placeholder="Search leads..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Status Filter
                                    </label>
                                    <select
                                        id="status"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All Status</option>
                                        <option value="New">New</option>
                                        <option value="Contacted">
                                            Contacted
                                        </option>
                                        <option value="Converted">
                                            Converted
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="sort"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Sort by Date
                                    </label>
                                    <button
                                        id="sort"
                                        onClick={handleSort}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        {sort === "desc"
                                            ? "Newest First"
                                            : "Oldest First"}
                                        <svg
                                            className="inline-block w-4 h-4 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d={
                                                    sort === "desc"
                                                        ? "M19 9l-7 7-7-7"
                                                        : "M5 15l7-7 7 7"
                                                }
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={clearFilters}
                                        className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {leads.data.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    {search || status
                                        ? "No leads found matching your criteria."
                                        : "No leads found."}
                                </p>
                                {(search || status) && (
                                    <button
                                        onClick={clearFilters}
                                        className="mt-4 text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {leads.data.map((lead) => (
                                    <div
                                        key={lead.id}
                                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {lead.name}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    lead.status === "New"
                                                        ? "bg-green-100 text-green-800"
                                                        : lead.status ===
                                                            "Contacted"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {lead.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-600">
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <span className="text-sm">
                                                    {lead.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                <span className="text-sm">
                                                    {lead.phone}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={() => handleEditClick(lead)}
                                                className={`flex-1 text-center px-3 py-1 text-sm rounded transition-colors duration-200 ${
                                                    canEditLead(lead)
                                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                                disabled={!canEditLead(lead)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(lead)}
                                                className={`flex-1 px-3 py-1 text-sm rounded transition-colors duration-200 ${
                                                    canDeleteLead(lead)
                                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                                disabled={!canDeleteLead(lead)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {leads.data.length > 0 && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex space-x-2">
                                    {leads.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-2 rounded-md text-sm ${
                                                link.active
                                                    ? "bg-blue-600 text-white"
                                                    : link.url
                                                      ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                            preserveScroll
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
