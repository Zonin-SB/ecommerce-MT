import { Routes, Route } from "react-router-dom";
import ProtectorRoutes from "./ProtectorRoutes/ProtectorRoutes";
import {
  AddProductPage,
  CartPage,
  HomePage,
  LoginPage,
  SignupPage,
} from "./Pages";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />

        <Route element={<ProtectorRoutes />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
