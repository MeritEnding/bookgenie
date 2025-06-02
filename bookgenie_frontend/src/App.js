import { RouterProvider } from "react-router-dom";
// App.js
import './App.css';
import router from "./router"

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>

    </div>
  );
}

export default App;
