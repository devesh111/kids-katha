const CategioryPage = async ({ params }) => {
    const { categoryId } = await params;
    return <div>Category: {categoryId}</div>;
};

export default CategioryPage;
