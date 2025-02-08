import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Story = lazy(() => import("./pages/Story"));

import "./App.scss";
import { lazy } from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/stories/:id' element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;
