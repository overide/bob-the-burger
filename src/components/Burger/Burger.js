import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
	let ingredients = Object.keys(props.ingredients)
		.map(igkey=>{
			return [...Array(props.ingredients[igkey])].map((_,i)=>{
				return <BurgerIngredient key={igkey+i} type={igkey}/>;
			});
		})
		.reduce((arr,el)=>{
			return arr.concat(el)
		},[]);

	if (ingredients.length === 0)
		ingredients = <p>Please add ingredient!</p>;

	return(
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{ingredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
}

export default burger