const SearchPage = async ({ searchParams }) => {
    const { q } = await searchParams;
    return <div>Search Results For: {q}</div>;
};

export default SearchPage;
