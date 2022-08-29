import {useRoutes} from "react-router-dom";
import indexRouter from "./routes";
import 'antd/dist/antd.less';

function App(props) {
    const elementRoute = useRoutes(indexRouter)
    return (
        <div style={{height:'100%'}}>
            {elementRoute}
        </div>
    );
}

export default App;