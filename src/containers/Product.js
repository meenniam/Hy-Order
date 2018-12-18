import { connect } from 'react-redux';
import Product from '../components/Product';
import { addToCart, removeFromCart, isInCart ,increaseToCart } from '../ducks/cart';

const mapStateToProps = (state, props) => {
    return {
        isInCart: isInCart(state, props)
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToCart: (id,amount) => dispatch(addToCart(id,amount)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    increaseToCart: (amount,id,price,name,image) => dispatch(increaseToCart(amount,id,price,name,image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);
