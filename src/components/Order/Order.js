import React from "react";
import classes from './Order.module.css'
const order = (props) => {
    let ingredientsNames = [];
    for(let [ingName,ingQuantity] of Object.entries(props.ingredients)){
        ingredientsNames.push(
            <span
            key={ingName}
            className={classes.IngredientTags}>
            {ingName} ({ingQuantity})
            </span>
        );
    }
    return(
        <div className={classes.Order}>
            <div>
                <div className={classes.IngredientTagsHolder}>
                    <span>Ingredients:</span>
                    {ingredientsNames}
                </div>
                <p>Price: <strong>USD {props.price}</strong> </p>
            </div>
        </div>
    )
}

export default order;