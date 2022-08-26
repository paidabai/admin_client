import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import 'antd/dist/antd.less';

class App extends Component {
    render() {
        return (
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/" element={<Admin />}></Route>
                </Routes>
        );
    }
}

export default App;