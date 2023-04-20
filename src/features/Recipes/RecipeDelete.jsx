import { useState } from 'react';
import { useAuthContext } from '../Auth/Auth.context';

export function RecipeDelete({ recipe, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { token } = useAuthContext();

  async function handleDelete() {
    const res = await fetch(`http://localhost:3000/recipes/${recipe.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.log('Error:', res);
      return;
    }

    onDelete(recipe.id);
  }

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>Delete</button>
      {showConfirm && (
        <div>
          <p>Are you sure you want to delete this recipe?</p>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </>
  );
}