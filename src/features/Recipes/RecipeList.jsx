import { useState, useEffect } from 'react';
import { useAuthContext } from '../Auth/Auth.context';
import { RecipeCard } from './RecipeCard';
import { RecipeDelete } from './RecipeDelete';
import { Link } from 'react-router-dom';
import styles from './RecipeStyles.module.css';

export function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const { token, user } = useAuthContext();

    useEffect(() => {
        async function fetchRecipes() {
            if (!user || !token) {
                console.log('User not authenticated');
                return;
            }

            const res = await fetch(`http://localhost:3000/recipes?userId=${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                console.log('Error:', res);
                return;
            }

            const data = await res.json();
            setRecipes(data);
        }

        fetchRecipes();
    }, [token, user]);

    const handleDelete = async (id) => {
        const newRecipes = recipes.filter((recipe) => recipe.id !== id);
        setRecipes(newRecipes);
    };

    return (
        <>
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <RecipeCard recipe={recipe} />
                        {user && user.id === recipe.userId && (
                            <>
                                <RecipeDelete recipe={recipe} onDelete={handleDelete} />
                                <button type="button" onClick={() => window.location.href = `/recipes/${recipe.id}/edit`}>
                                    Edit
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}