import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/Auth.context';
import { GlobalMessage } from '../../components';
import clsx from 'clsx';
import styles from './RecipeStyles.module.css';

export function EditRecipe() {
  const { id } = useParams();
  const { token, user } = useAuthContext();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [numberOfDishes, setNumberOfDishes] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [difficulty, setDifficulty] = useState([]);
  const [cuisine, setCuisine] = useState('');

  const [globalMessage, setGlobalMessage] = useState({ message: '', type: 'error' });

  useEffect(() => {
    async function fetchRecipe() {
      if (!user || !token) {
        setGlobalMessage({ message: 'User not authenticated', type: 'error' });
        return;
      }

      const res = await fetch(`http://localhost:3000/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setGlobalMessage({ message: `Error: ${res.statusText}`, type: 'error' });
        return;
      }

      const data = await res.json();
      setName(data.name);
      setImage(data.image);
      setNumberOfDishes(data.numberOfDishes);
      setIngredients(data.ingredients);
      setSteps(data.steps);
      setDifficulty(data.difficulty);
      setCuisine(data.cuisine);
    }

    fetchRecipe();
  }, [id, token, user]);

  async function handleNameUpdate() {
    if (!user || !token) {
      setGlobalMessage({ message: 'User not authenticated', type: 'error' });
      return;
    }

    if (!name) {
      setGlobalMessage({ message: 'Field is empty. Please write a valid dish name.', type: 'error' });
      return;
    }

    try {
      await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setGlobalMessage({ message: 'Recipe updated successfully!', type: 'success' });

    } catch (error) {
      setGlobalMessage({ message: error.message, type: 'error' });
    }
  }

  async function handleImageUpdate() {
    if (!user || !token) {
      setGlobalMessage({ message: 'User not authenticated', type: 'error' });
      return;
    }

    if (!image || !isValidUrl(image)) {
      setGlobalMessage({ message: 'Please provide a valid image URL.', type: 'error' });
      return;
    }

    try {
      await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ image }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setGlobalMessage({ message: 'Recipe updated successfully!', type: 'success' });

    } catch (error) {
      setGlobalMessage({ message: error.message, type: 'error' });
    }
  }

  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  async function handleNumberOfDishesUpdate() {
    if (!user || !token) {
      setGlobalMessage({ message: 'User not authenticated', type: 'error' });
      return;
    }

    if (numberOfDishes === 'default') {
      setGlobalMessage({ message: 'Please select a valid number of dishes.', type: 'error' });
      return;
    }

    if (!isNaN(numberOfDishes)) {
      try {
        await fetch(`http://localhost:3000/recipes/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ numberOfDishes }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setGlobalMessage({ message: 'Recipe updated successfully!', type: 'success' });

      } catch (error) {
        setGlobalMessage({ message: error.message, type: 'error' });
      }
    } else {
      setGlobalMessage({ message: 'Please select a valid number of dishes.', type: 'error' });
    }
  }

  async function handleIngridientsUpdate() {
    if (!user || !token) {
      setGlobalMessage({ message: 'User not authenticated', type: 'error' });
      return;
    }
  
    if (!ingredients) {
      setGlobalMessage({ message: 'Ingredients field is empty', type: 'error' });
      return;
    }
  
    try {
      await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ingredients }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setGlobalMessage({ message: 'Recipe updated successfully!', type: 'success' });
  
    } catch (error) {
      setGlobalMessage({ message: error.message, type: 'error' });
    }
  }

  async function handleStepsToUpdate() {
    if (!user || !token) {
      setGlobalMessage({ message: 'User not authenticated', type: 'error' });
      return;
    }
  
    if (!steps) {
      setGlobalMessage({ message: 'Field is empty. Please enter steps to take.', type: 'error' });
      return;
    }
  
    try {
      await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ steps }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setGlobalMessage({ message: 'Recipe updated successfully!', type: 'success' });
  
    } catch (error) {
      setGlobalMessage({ message: error.message, type: 'error' });
    }
  }

  async function handleDifficultyUpdate() {
    if (!user || !token) {
      setGlobalMessage({ message: 'User not authenticated', type: 'error' });
      return;
    }
  
    if (difficulty.length === 0) {
      setGlobalMessage({ message: 'Please select at least one difficulty level.', type: 'error' });
      return;
    }
  
    try {
      await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ difficulty }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setGlobalMessage({ message: 'Recipe updated successfully!', type: 'success' });
  
    } catch (error) {
      setGlobalMessage({ message: error.message, type: 'error' });
    }
  }
  
  async function handleCuisineUpdate() {
    if (!user || !token) {
      setGlobalMessage({ message: 'User not authenticated', type: 'error' });
      return;
    }
  
    if (cuisine === '') {
      setGlobalMessage({ message: 'Please select a valid cuisine.', type: 'error' });
      return;
    }
  
    try {
      await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ cuisine }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      setGlobalMessage({ message: 'Recipe updated successfully!', type: 'success' });
  
    } catch (error) {
      setGlobalMessage({ message: error.message, type: 'error' });
    }
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

  function handleSaveChanges(e) {
    e.preventDefault();
    window.location.href = '/recipes';
  }
  return (
    <>
      <h1>Edit Recipe</h1>
      <GlobalMessage
        type={globalMessage.type}
        onMessageClosed={() => setGlobalMessage({ message: '', type: 'error' })}
      >
        {globalMessage.message}
      </GlobalMessage>
      <form>
        <label htmlFor="name">Name of the Dish</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <button
          type="button"
          onClick={() => handleNameUpdate({ name })}
        >
          Update
        </button>

        <label htmlFor="image">Image (URL)</label>
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={handleImageChange}
        />
        <button
          type="button"
          onClick={() => handleImageUpdate({ image })}
        >
          Update
        </button>
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
        <button
          type="button"
          onClick={() => {
            if (numberOfDishes === "") {
              setGlobalMessage({
                message: "Please select a valid number of dishes.",
                type: "error",
              });
            } else {
              handleNumberOfDishesUpdate({ numberOfDishes });
              setGlobalMessage({
                message: "Number of dishes updated successfully!",
                type: "success",
              });
            }
          }}
        >
          Update
        </button>

        {numberOfDishes === "custom" && (
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
            <button
              type="button"
              onClick={() => {
                handleNumberOfDishesUpdate({ numberOfDishes: "" });
                setGlobalMessage({
                  message: "Number of dishes updated successfully!",
                  type: "success",
                });
              }}
            >
              Update
            </button>
          </div>
        )}

        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={ingredients}
          onChange={handleIngredientsChange}
        />
        <button
          type="button"
          onClick={() => handleIngridientsUpdate({ ingredients })}
        >
          Update
        </button>

        <label htmlFor="steps">Steps to Take</label>
        <textarea
          id="steps"
          name="steps"
          value={steps}
          onChange={handleStepsChange}
        />
        <button type="button" onClick={() => handleStepsToUpdate({ steps })}>
          Update
        </button>
        <div>
          <p>Difficulty:</p>
          <label>
            <input type="checkbox" name="difficulty" value="Easy" checked={difficulty.includes('Easy')} onChange={handleDifficultyChange} />
            Easy
          </label>
          <label>
            <input type="checkbox" name="difficulty" value="Medium" checked={difficulty.includes('Medium')} onChange={handleDifficultyChange} />
            Medium
          </label>
          <label>
            <input type="checkbox" name="difficulty" value="Hard" checked={difficulty.includes('Hard')} onChange={handleDifficultyChange} />
            Hard
          </label>
          <button type="button" onClick={handleDifficultyUpdate}>Update</button>
        </div>
        <div className={styles.cuisine}>
          <label htmlFor="cuisine">Cuisine</label>
          <select id="cuisine" name="cuisine" value={cuisine} onChange={handleCuisineChange}>
            <option value="">Select Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="French">French</option>
            <option value="Romanian">Romanian</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Japanese">Japanese</option>
            <option value="Korean">Korean</option>
          </select>
          <button type="button" className={styles.updateBtn} onClick={() => handleCuisineUpdate({ cuisine })}>Update</button>
        </div>
        <button type="submit" className={styles.saveChangesBtn} onClick={handleSaveChanges}>Back to Recipes</button>

      </form>


    </>
  );
}