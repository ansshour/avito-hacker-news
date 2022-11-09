import './App.css';
import { Header } from './components/Header/Header';
import { News } from './pages/News/News';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { store } from './store';
import { Provider } from 'react-redux';
import { NewsDetail } from './pages/NewsDetail/NewsDetail';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="news/:id" element={<NewsDetail />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </>
  );
}