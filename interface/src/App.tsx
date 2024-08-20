import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
const Layout = React.lazy(() => import("./Layout"));
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/men" element={<div>Men</div>} />
        <Route path="/women" element={<div>Women</div>} />
        <Route path="/kids" element={<div>Kids</div>} />
        <Route path="/accessories" element={<div>Accessories</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </Router>
  );
}

export default App;
