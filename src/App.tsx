import { Router } from '@reach/router';
import React from 'react';

import { useAuth } from './AuthContext';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipeEditPage from './pages/RecipeEditPage';
import RecipeListPage from './pages/RecipeListPage';
import SideDishListPage from './pages/SideDishListPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';
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
