import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Component
import AboutView from './page/AboutView'
import CartView from './page/CartView'
import HomeView from './page/HomeView'
import OrderView from './page/OrderView'
import ProductView from './page/ProductView'
import DetailProduct from "./page/DetailProduct";
import LoginView from './page/Auth/LoginView'
import RegisterView from './page/Auth/RegisterView'
import CheckOutView from "./components/CheckOutView";
import CreateProductView from "./page/CreateProductView";
import EditProductView from "./page/EditProductView";
import PublicLayout from "./layouts/PublicLayout";


//loader
import { loader as HomeLoader } from "./page/HomeView";
import { loader as ProductLoader } from "./page/ProductView";
import { loader as CheckoutLoader } from "./components/CheckOutView";
import { loader as OrderLoader } from "./page/OrderView";
import { loader as CreateProductLoader } from "./page/CreateProductView";
import { loader as EditProductLoader } from "./page/EditProductView";

//action
import { action as loginAction } from './page/Auth/LoginView'
import { action as registerAction } from './page/Auth/RegisterView'

//storage
import { store } from "./store";

//Error component
import ErrorView from "./page/ErrorView";

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader

      },
      {
        path: "products",
        element: <ProductView />,
        loader: ProductLoader
      },
      {
        path: "product/create",
        element: <CreateProductView />,
        loader: CreateProductLoader(store)
      },
      {
        path: "product/:id/edit",
        element: <EditProductView />,
        loader: EditProductLoader(store)
      },
      {
        path: "orders",
        element: <OrderView />,
        loader: OrderLoader(store)
      },
      {
        path: "checkout",
        element: <CheckOutView />,
        loader: CheckoutLoader(store),
      },
      {
        path: "carts",
        element: <CartView />,
      },
      {
        path: "about",
        element: <AboutView />,
      },
      {
        path: "product/:id",
        element: <DetailProduct />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginView />,
    action: loginAction(store)
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: registerAction(store)
  },
])

function App() {


  return <RouterProvider router={router} />;
}

export default App
