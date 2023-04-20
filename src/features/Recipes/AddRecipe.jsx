import { useState } from 'react';
import { useAuthContext } from '../Auth/Auth.context';
import { GlobalMessage } from '../../components';
import clsx from 'clsx';
import styles from './RecipeStyles.module.css';

export function AddRecipe() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [numberOfDishes, setNumberOfDishes] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [difficulty, setDifficulty] = useState([]);
    const [cuisine, setCuisine] = useState('');
    const [globalMessage, setGlobalMessage] = useState({ message: '', type: 'error' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
    const { token, user } = useAuthContext();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user || !token) {
            setGlobalMessage({ message: 'User not authenticated', type: 'error' });
            return;
        }
        if (!name || !image || !numberOfDishes || !ingredients || !steps || !difficulty.length || !cuisine) {
            setGlobalMessage({ message: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        const newRecipe = {
            name: name,
            image: image,
            numberOfDishes: numberOfDishes,
            ingredients: ingredients,
            steps: steps,
            difficulty: difficulty,
            cuisine: cuisine,
            userId: user.id,
        };

        const res = await fetch(`http://localhost:3000/recipes?userId=${user.id}`, {
            method: 'POST',
            body: JSON.stringify(newRecipe),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            setGlobalMessage({ message: 'Error: ' + res.statusText, type: 'error' });
            return;
        }

        setName('');
        setImage('');
        setNumberOfDishes('');
        setIngredients('');
        setSteps('');
        setDifficulty([]);
        setCuisine('');
        setIsFormSubmitted(false);
        setGlobalMessage({ message: 'Recipe added successfully!', type: 'success' });
    }
    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleImageChange(e) {
        setImage(e.target.value);
    }

    function handleNumberOfDishesChange(e) {
        setNumberOfDishes(e.target.value);
    }

    function handleIngredientsChange(e) {
        setIngredients(e.target.value);
    }

    function handleStepsChange(e) {
        setSteps(e.target.value);
    }

    function handleDifficultyChange(e) {
        const value = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            setDifficulty([...difficulty, value]);
        } else {
            setDifficulty(difficulty.filter((d) => d !== value));
        }
    }

    function handleCuisineChange(e) {
        setCuisine(e.target.value);
    }
    return (
        <div className={styles['add-recipe']}>
            <h1>Add Recipe</h1>
            <GlobalMessage
                type={globalMessage.type}
                onMessageClosed={() =>
                    setGlobalMessage({ message: '', type: 'error' })
                }
            >
                {globalMessage.message}
            </GlobalMessage>
            <form onSubmit={handleSubmit}>
                <p className={clsx({ [styles['has-error']]: !name && isFormSubmitted })}>
                    <label htmlFor="name">Name of the Dish</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    {!name && isFormSubmitted && (
                        <span className={styles['error-message']}>
                            Please enter a name for the dish.
                        </span>
                    )}
                </p>
                <p className={clsx({ [styles['has-error']]: !image && isFormSubmitted })}>
                    <label htmlFor="image">Image (URL)</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={image}
                        onChange={handleImageChange}
                    />
                    {!image && isFormSubmitted && (
                        <span className={styles['error-message']}>
                            Please enter an image URL.
                        </span>
                    )}
                </p>
                <p
                    className={clsx({
                        [styles['has-error']]: !numberOfDishes && isFormSubmitted,
                    })}
                >
                    <label htmlFor="number-of-dishes">Number of Dishes</label>
                    <select
                        id="number-of-dishes"
                        name="number-of-dishes"
                        value={numberOfDishes}
                        onChange={handleNumberOfDishesChange}
                    >
                        <option value="">Select Number of Dishes</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="custom">Custom</option>
                    </select>
                    {!numberOfDishes && isFormSubmitted && (
                        <span className={styles['error-message']}>
                            Please select a number of dishes.
                        </span>
                    )}
                    {numberOfDishes === 'custom' && (
                        <div>
                            <label htmlFor="custom-number-of-dishes">
                                Custom Number of Dishes
                            </label>
                            <input
                                type="text"
                                id="custom-number-of-dishes"
                                name="custom-number-of-dishes"
                                value={numberOfDishes}
                                onChange={handleNumberOfDishesChange}
                            />
                        </div>
                    )}
                </p>
                <p
                    className={clsx({
                        [styles['has-error']]: !ingredients && isFormSubmitted,
                    })}
                >
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        value={ingredients}
                        onChange={handleIngredientsChange}
                    />
                    {!ingredients && isFormSubmitted && (
                        <span className={styles['error-message']}>
                            .</span>
                    )}
                </p>
                <p
                    className={clsx({ [styles['has-error']]: !steps && isFormSubmitted })}
                >
                    <label htmlFor="steps">Steps to Take</label>
                    <textarea
                        id="steps"
                        name="steps"
                        value={steps}
                        onChange={handleStepsChange}
                    />
                    {!steps && isFormSubmitted && (
                        <span className={styles['error-message']}>
                            Please enter some steps to take.
                        </span>
                    )}
                </p>
                <div>
                    <p>Difficulty:</p>
                    <label>
                        <input
                            type="checkbox"
                            name="difficulty"
                            value="Easy"
                            checked={difficulty.includes('Easy')}
                            onChange={handleDifficultyChange}
                        />
                        Easy
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="difficulty"
                            value="Medium"
                            checked={difficulty.includes('Medium')}
                            onChange={handleDifficultyChange}
                        />
                        Medium
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="difficulty"
                            value="Hard"
                            checked={difficulty.includes('Hard')}
                            onChange={handleDifficultyChange}
                        />
                        Hard
                    </label>
                    {!difficulty.length && isFormSubmitted && (
                        <span className={styles['error-message']}>
                            Please select a difficulty level.
                        </span>
                    )}
                </div>
                <p
                    className={clsx({
                        [styles['has-error']]: !cuisine && isFormSubmitted,
                    })}
                >
                    <label htmlFor="cuisine">Cuisine</label>
                    <select
                        id="cuisine"
                        name="cuisine"
                        value={cuisine}
                        onChange={handleCuisineChange}
                    >
                        <option value="">Select Cuisine</option>
                        <option value="Italian">Italian</option>
                        <option value="French">French</option>
                        <option value="Romanian">Romanian</option>
                        <option value="Indian">Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Korean">Korean</option>
                    </select>
                    {!cuisine && isFormSubmitted && (
                        <span className={styles['error-message']}>
                            Please select a cuisine.
                        </span>
                    )}
                </p>
                <button type="submit" className={styles['submit-button']}>
                    Add Recipe
                </button>
            </form>

        </div>
    );
}