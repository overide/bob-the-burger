import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	let ingredientSummary = Object.keys(props.ingredients)
		.map( igKey => {
			return (
				<li key={igKey}>
					<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
				</li>
			);
		});

	return(
		<Aux>
			<h3>Your Order</h3>
			<p> A delicious burger with following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p> 
			<p>Continue to checkout? </p> 
			<Button clicked = {props.purchaseContinueHandler} btnType={"Success"}>
				Checkout
			</Button>
			<Button clicked = {props.purchaseHandler} btnType={"Danger"}>
				Cancle
			</Button> 
		</Aux>
	);
}

export default orderSummary;