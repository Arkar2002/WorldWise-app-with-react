import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CitiesList from "./components/CitiesList";
import { CitiesProvider } from "./contexts/CitiesContext";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <FakeAuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Homepage />} />
            <Route path="/product" index element={<Product />} />
            <Route path="/pricing" index element={<Pricing />} />
            <Route path="/login" index element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CitiesList />} />
              <Route path="countries" element={<CountriesList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="/*" index element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </FakeAuthProvider>
  );
}

export default App;
