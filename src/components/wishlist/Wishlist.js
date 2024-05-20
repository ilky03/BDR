import { useState, useEffect } from 'react'; 

import useDB from '../../services/useDB';

import WishBlock from '../wishBlock/WishBlock';
import './wishlist.scss';

function Wishlist({handleAddNewWish, isChangedWishlist, handleEditWish}) {
    const { makeQuery, deleteRecord } = useDB();
    const [wishlistData, setWishlistData] = useState();
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        makeQuery('/wishlist/').then(data => {setWishlistData(data)});
    }, [isChangedWishlist, isDeleted])
 
    const handleDeleteWish = (id) => {
        deleteRecord(`/wishlist/${id}`);
        setIsDeleted(!isDeleted);
    }   

    return (
        <section className="container wishlist">
            <div className="container__header">
                <h2>Список бажань</h2>
            </div>
            <div className="wishlist__blocks">
            {wishlistData && wishlistData.map((item) => (
                <WishBlock
                    key={item.id}
                    id={item.id}
                    done={item.done}
                    sum={item.sum}
                    imgUrl={item.link}
                    handleDeleteWish={handleDeleteWish}
                    handleEditWish={handleEditWish}
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