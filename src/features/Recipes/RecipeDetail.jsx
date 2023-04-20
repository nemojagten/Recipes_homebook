import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuthContext } from '../Auth/Auth.context';
import clsx from "clsx";
import styles from './RecipeStyles.module.css';

export function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { token } = useAuthContext();

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(`http://localhost:3000/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.log('Error:', res);
        return;
      }
      const data = await res.json();
      setRecipe(data);
    }
    fetchRecipe();
  }, [id, token]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{recipe.name}</h1>
      <div className={clsx(styles.detail, 'my-custom-class')}>
        <img width="100" src={recipe.image} alt={recipe.name} />
        <p>Number of Dishes: {recipe.numberOfDishes}</p>
        <p>Ingredients:</p>
        <pre>{recipe.ingredients}</pre>
        <p>Steps to Take:</p>
        <pre>{recipe.steps}</pre>
        <p>Difficulty: {recipe.difficulty ? recipe.difficulty.join(', ') : ''}</p>
        <p>Cuisine: {recipe.cuisine}</p>
      </div>

    </>
  );
}