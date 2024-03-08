import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'


// Pages & Components
import Home from './pages/Home'
import Cart from './pages/Cart'
import Coupons from './pages/Coupons'
import History from './pages/History'
import Navbar from './components/Navbar'
import { ShopContextProvider } from './context/shopContext'
import { FavoriteContextProvider } from './context/favoriteContext'

function App() {
  const [pickedShop, setPickedShop] = useState(null);

  return (
    <div className="App">
      <ShopContextProvider pickedShop={pickedShop} setPickedShop={setPickedShop}>
        <FavoriteContextProvider>
          <BrowserRouter>
            <Navbar />
            <div className="pages">
              <Routes>
                <Route
                  path="/"
                  element={ <Home pickedShop={pickedShop} setPickedShop={setPickedShop}/> }
                />
                <Route
                  path="/cart"
                  element={ <Cart /> }
                />
                <Route
                  path="/history"
                  element={ <History /> }
                />
                <Route
                  path="/coupons"
                  element={ <Coupons /> }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </FavoriteContextProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;
