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
import AddProduct from './pages/product/addProduct/addProduct';
import CreateGroups from './pages/groups/addGroups/createGroups';
import NotFound from './pages/notFound/notFound';
import ServerError from './pages/serverError/serverError';
import GroupDetails from './pages/groups/details/groupDetails';
import ModifyGroups from './pages/groups/modifyGroups/modifyGroups';
import CreateContainer from './pages/container/createContainer/createContainer';
import ContainerDetails from './pages/container/details/containerDetails';
import AddProductCam from './pages/product/addProductCam/addProductCam';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route exact path="/home" element={<Home />} />
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

        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
