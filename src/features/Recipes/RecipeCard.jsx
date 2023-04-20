import { Link } from 'react-router-dom';
import styles from './RecipeStyles.module.css';

export function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className={styles.recipeCard}>
      <div className={styles.recipeColumn}>
        <h2>{recipe.name}</h2>
        <img width="150" src={recipe.image} alt={recipe.name} />
        <p>Number of Dishes: {recipe.numberOfDishes}</p>
        <p>Ingredients:</p>
        <pre>{recipe.ingredients}</pre>
        <p>Steps to Take:</p>
        <pre>{recipe.steps}</pre>
        <p>Difficulty:</p>
        <ul>
          {recipe.difficulty.map((level) => (
            <li key={level}>{level}</li>
          ))}
        </ul>
        <p>Cuisine: {recipe.cuisine}</p>
      </div>
    </Link>
  );
}