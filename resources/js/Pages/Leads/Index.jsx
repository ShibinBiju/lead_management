import { usePage, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Index() {
    const { leads } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                        <Link
                            href={route('leads.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Create Lead
                        </Link>
                    </div>

                    {leads.data.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No leads found.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {leads.data.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                            lead.status === 'New' ? 'bg-green-100 text-green-800' :
                                            lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm">{lead.email}</span>
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <span className="text-sm">{lead.phone}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex space-x-2">
                                        <Link
                                            href={route('leads.edit', lead.id)}
                                            className="flex-1 text-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this lead?')) {
                                                    router.delete(route('leads.destroy', lead.id));
                                                }
                                            }}
                                            className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}