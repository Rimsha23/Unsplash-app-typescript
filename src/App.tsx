import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Unsplash from './unsplash';
import store from './store';
import CollectionPage from './collectionPage';
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Unsplash />} />
          <Route path="/collection" element={<CollectionPage />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
