import { useForm, Link } from '@inertiajs/react';

export default function Edit({ lead }) {

    const { data, setData, put, errors } = useForm({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('leads.update', lead.id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Edit Lead</h1>
                        <p className="mt-2 text-gray-600">Update lead information</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.name && (
                                <div className="mt-1 text-sm text-red-600">{errors.name}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.email && (
                                <div className="mt-1 text-sm text-red-600">{errors.email}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                Phone
                            </label>
                            <input
                                id="phone"
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.phone && (
                                <div className="mt-1 text-sm text-red-600">{errors.phone}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Converted">Converted</option>
                            </select>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Update Lead
                            </button>
                            <Link
                                href={route('leads.index')}
                                className="flex-1 text-center px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}