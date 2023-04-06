import { getShoppingCart } from "../utilities/fakedb";

 const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json');
    const products = await loadedProducts.json();
    const storedCart = getShoppingCart();
    let savedCart = [];
    for(const id in storedCart){
        const addedCart = products.find(product => product.id === id );
        if(addedCart){
            const quantity = storedCart[id];
            addedCart.quantity = quantity;
            savedCart.push(addedCart);
        }
    }
    return savedCart;
    

 }
 export default cartProductsLoader;