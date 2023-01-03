import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HeroSearch from "./pages/HeroSearch";
import Favorites from "./pages/Favorites";
import AnimeResume from "./pages/AnimeResume";
import { ConfigProvider } from "antd";
import COLORS from "./constants/colors";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/Auth";
import "./App.css";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: COLORS.PRIMARY,
        },
      }}
    >
      <BrowserRouter>
        <AuthProvider>
          <ApolloProvider client={client}>
            <div className="App">
              <Header />
              <Routes>
                <Route path="/favs" element={<Favorites />} />
                <Route path="/anime/:id" element={<AnimeResume />} />
                <Route path="/" element={<HeroSearch />} />
              </Routes>
            </div>
          </ApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
