import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
	{label:'Salad',type:'salad'},
	{label:'Bacon',type:'bacon'},
	{label:'Cheese',type:'cheese'},
	{label:'Meat',type:'meat'}
]

const BuildControls = (props) => {

	let purchasable = props.isAuthenticated && props.purchasable;

	return(
		<div className={classes.BuildControls}>
			<p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
			{controls.map((ctrl)=>(
				<BuildControl 
					key = {ctrl.label} 
					label = {ctrl.label}
					addIngredient = {()=>(props.addIngredient(ctrl.type))}
					removeIngredient = {()=>(props.removeIngredient(ctrl.type))}
					disabled = {props.disabledInfo[ctrl.type]}
				/>
			))}
			<button 
				className = {classes.OrderButton}
				disabled = {!purchasable}
				onClick = {props.purchaseHandler}>
				{props.isAuthenticated?"ORDER NOW":"SIGN IN TO ORDER"}
			</button>
		</div>
	);
}

export default BuildControls;