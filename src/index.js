import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

const user = storageUtils.getUser()
memoryUtils.user = user

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)