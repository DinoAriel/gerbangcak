import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    const getRelativeUrl = (url) => {
        if (!url) return null;
        try {
            const parsed = new URL(url, window.location.origin);
            return parsed.pathname + parsed.search;
        } catch (e) {
            return url;
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <ul className="flex space-x-1 border rounded-lg overflow-hidden border-gray-300">
                {links.map((link, index) => {
                    const href = getRelativeUrl(link.url);
                    return (
                        <li key={index}>
                            {href ? (
                                <Link
                                    href={href}
                                    className={`block px-4 py-2 text-sm font-medium transition-colors ${
                                        link.active
                                            ? 'bg-blue-900 text-white'
                                            : 'bg-white text-gray-700 border-x border-gray-200 hover:bg-blue-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ) : (
                                <span
                                    className="block px-4 py-2 text-sm font-medium bg-gray-50 text-gray-400 border-x border-gray-200 cursor-not-allowed"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
