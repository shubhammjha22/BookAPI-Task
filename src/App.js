import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import MyBookShelf from "./components/myBookShelf";
import RootLayout from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <BookShelf /> },
      { path: "/myBook", element: <MyBookShelf /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
