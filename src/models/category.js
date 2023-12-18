async function getCategories() {
    try {
        const response = await fetch(`http://localhost:3000/categories`);
        if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
        const categories = await response.json();
        return categories;
      } catch (err) {
        console.error('getOnQuestion::error: ', err);
        throw err;
      }
}
export default getCategories;;