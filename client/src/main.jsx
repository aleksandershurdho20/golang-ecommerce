import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store/store';
import { BrowserRouter  } from 'react-router-dom';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);