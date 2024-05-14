import { useState, useEffect } from 'react'; 

import useDB from '../../services/useDB';

import WishBlock from '../wishBlock/WishBlock';
import './wishlist.scss';

function Wishlist({handleAddNewWish, isChangedWishlist}) {
    const { makeQuery } = useDB();
    const [wishlistData, setWishlistData] = useState();

    useEffect(() => {
        makeQuery('/wishlist/').then(data => {console.log(data);setWishlistData(data)});
    }, [isChangedWishlist])

    return (
        <section className="container wishlist">
            <div className="container__header">
                <h2>Список бажань</h2>
                <button>Налаштування</button>
            </div>
            <div className="wishlist__blocks">
                {wishlistData && wishlistData.map((item, key) => (
                    <WishBlock
                        done={item.done}
                        sum={item.sum}
                        imgUrl={item.link}
                    />
                ))}
                <button onClick={handleAddNewWish} className="wishlist__block wishlist__block_add-new">
                    <p>+</p>
                </button>
            </div>
        </section>
    )
}

export default Wishlist;