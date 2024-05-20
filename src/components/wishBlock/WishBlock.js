import deleteIcon from '../../resources/img/icons/delete.svg';
import editIcon from '../../resources/img/icons/edit.svg';

function WishBlock({id, done, sum, imgUrl, handleDeleteWish, handleEditWish}) {
    let remain = sum - done;
    let remainInPerc = (100*remain)/sum;
    let doneInPerc = 100 - remainInPerc;

    return (
        <div 
            className="wishlist__block"
            style={{backgroundImage: `url(${imgUrl})`}}
        >
            <div className="wishlist__btns">
                <button 
                    className="wishlist__btn"
                    onClick={()=>handleEditWish({id, done, sum})}
                   ><img src={editIcon} alt='edit icon'/></button>
                <button 
                    className="wishlist__btn"
                    onClick={()=>handleDeleteWish(id)}><img src={deleteIcon} alt='delete icon'/></button>
            </div>
            <div className="wishlist__progress-bar">
                <div className="wishlist__progress-bar_done" style={{width: `${doneInPerc}%`}}></div>
                <p>{doneInPerc.toFixed(2)}%</p>
                <div className="wishlist__progress-bar_remain" style={{width: `${remainInPerc}%`}}></div>
            </div>
        </div>
    )
}

export default WishBlock;



