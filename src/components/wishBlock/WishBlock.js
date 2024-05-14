function WishBlock({done, sum, imgUrl}) {
    let remain = sum - done;
    let remainInPerc = (100*remain)/sum;
    let doneInPerc = 100 - remainInPerc;

    return (
        <div className="wishlist__block" style={{backgroundImage: `url(${imgUrl})`}}>
            <div className="wishlist__progress-bar">
                <div className="wishlist__progress-bar_done" style={{width: `${doneInPerc}%`}}></div>
                <p>{doneInPerc.toFixed(2)}%</p>
                <div className="wishlist__progress-bar_remain" style={{width: `${remainInPerc}%`}}></div>
            </div>
        </div>
    )
}

export default WishBlock;



