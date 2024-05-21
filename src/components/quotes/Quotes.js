import './quotes.scss';
import defaultBackground from '../../resources/img/quotes-bg-1.png'
function Quotes({ backgroundUrl }) {
    
    return (
        <section 
            className="container quotes" 
            style={{ 
                backgroundImage: `url(${backgroundUrl || defaultBackground})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
        </section>       
    );
}

export default Quotes;
