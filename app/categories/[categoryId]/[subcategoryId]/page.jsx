const SubCategoryPage = async ({ params }) => {
    const { subcategoryId } = await params;
    return <div>Subcategory: {subcategoryId}</div>;
};

export default SubCategoryPage;
