import '../styles/App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import Components
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';


// React routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>
  },
  {
    path: '/quiz',
    element: <Quiz></Quiz>
  },
  {
    path: '/results',
    element: <Result></Result>
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
