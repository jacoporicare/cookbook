import { Router } from '@reach/router';
import React from 'react';

import { useAuth } from './AuthContext';
import AdminPage from './pages/AdminPage';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import RecipeListPage from './pages/RecipeListPage';
import SettingsPage from './pages/SettingsPage';
import SideDishListPage from './pages/SideDishListPage';
import Reboot from './styles/Reboot';

import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [token] = useAuth();

  return (
    <>
      <Reboot />
      <Router>
        <Layout path="/">
          <RecipeListPage path="/" />
          <RecipeListPage path="tagy/:tags" />
          <RecipeDetailPage path="recept/:slug" />
          {token && <RecipeEditPage path="recept/:slug/upravit" />}
          {token && <RecipeEditPage path="novy-recept" />}
          <SideDishListPage path="prilohy" />
          <LoginPage path="prihlaseni" />
          <LogoutPage path="odhlaseni" />
          <SettingsPage path="nastaveni" />
          <AdminPage path="admin" />
          <NotFoundPage default />
        </Layout>
      </Router>
    </>
  );
}

export default App;
