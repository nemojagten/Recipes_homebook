import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav, NotFound } from './components';
import { Auth, AddRecipe, RecipeDetail, RecipeList, RecipeDelete, EditRecipe, Home } from './features';
import { AuthContextProvider } from './features/Auth/Auth.context';
import { EditDetails } from './features/Auth/EditDetails';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/edit" element={<EditDetails />} />
          <Route path="/recipes/*" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes/:id/delete" element={<RecipeDelete />} />
          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}