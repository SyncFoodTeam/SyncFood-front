import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LoginPage from './auth/login/loginPage';
import RegisterPage from './auth/register/registerPage';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/home';
import LunchPage from './pages/lunchPage/lunchPage';
import Settings from './pages/settings/settings';
import GroupsList from './pages/groups/list/groupsList';
import Messages from './pages/message/message';
import AddProduct from './pages/product/addProductManual/addProductManual';
import CreateGroups from './pages/groups/createGroups/createGroups';
import NotFound from './pages/notFound/notFound';
import ServerError from './pages/serverError/serverError';
import GroupDetails from './pages/groups/details/groupDetails';
import ModifyGroups from './pages/groups/modifyGroups/modifyGroups';
import CreateContainer from './pages/container/createContainer/createContainer';
import ContainerDetails from './pages/container/details/containerDetails';
import AddProductManual from './pages/product/addProductManual/addProductManual';
import ModifyContainer from './pages/container/modifyContainer/modifyContainer';
import AddProductCam from './pages/product/addProductCam/addProductCam';
import ProductDetails from './pages/product/details/productDetails';
import ProductList from './pages/product/list/productList';

import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import ModifyProduct from './pages/product/modify/modifyProduct';

const root = ReactDOM.createRoot(document.getElementById("root"));
const userLanguage = navigator.language || navigator.userLanguage;

i18next.init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  lng: userLanguage,
  interpolation: {
    escapeValue: false,
  },
});

root.render(

  <React.StrictMode>
<I18nextProvider i18n={i18next}>

    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route exact path="/" element={<Home />} />
        <Route path="groupes" element={<GroupsList />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
        <Route path="createGroups" element={<CreateGroups />} />
        <Route path="groupDetails" element={<GroupDetails />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="notFound" element={<NotFound />} />
        <Route path="serverError" element={<ServerError />} />
        <Route path="lunchPage" element={<LunchPage />} />
        <Route path="modifyGroups" element={<ModifyGroups />} />
        <Route path="createContainer" element={<CreateContainer />} />
        <Route path="containerDetails" element={<ContainerDetails />} />
        <Route path="addProductCam" element={<AddProductCam />} />
        <Route path="addProductManual" element={<AddProductManual />} />
        <Route path="modifyContainers" element={<ModifyContainer />} />
        <Route path="productDetails" element={<ProductDetails />} />
        <Route path="productList" element={<ProductList />} />
        <Route path="modifyProduct" element={<ModifyProduct />} />
  
      </Routes>
    </BrowserRouter>
    </I18nextProvider>

  </React.StrictMode>
);

reportWebVitals();
