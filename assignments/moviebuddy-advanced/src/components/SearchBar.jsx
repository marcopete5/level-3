export default function SearchBar({ setSearchQuery, setRatingFilter }) {
    return (
        <div
            className="flex flex-col sm:flex-row gap-4 mb-4"
            style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Search movies..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
            />
            <select
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white">
                <option value="0">All Ratings</option>
                <option value="5">5.0+</option>
                <option value="4">4.0+</option>
            </select>
        </div>
    );
}
