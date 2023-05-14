import { getShoppingCart } from "../utilities/fakedb";

 const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('http://localhost:5000/products');
    const products = await loadedProducts.json();
    const storedCart = getShoppingCart();
    let savedCart = [];
    for(const id in storedCart){
        const addedCart = products.find(product => product._id === id );
        if(addedCart){
            const quantity = storedCart[id];
            addedCart.quantity = quantity;
            savedCart.push(addedCart);
        }
    }
    return savedCart;
    

 }
 export default cartProductsLoader;