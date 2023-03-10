import { Routes, Route } from "react-router-dom";
import { AddProductPage, HomePage, LoginPage, SignupPage } from "./Pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
