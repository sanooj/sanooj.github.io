import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home/Home"));
const Story = lazy(() => import("./pages/Story/Story"));

import "./assets/styles/styles.scss";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stories/:user/:id' element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;
