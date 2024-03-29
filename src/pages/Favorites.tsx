import React from "react";
import AnimeCard from "../components/AnimeCard/AnimeCard";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "../gql/queries/movies";
import { Anime } from "../types/Anime";
import { Col, Row, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { purple } from "@ant-design/colors";
import styled from "styled-components";
import useAuth from "../context/Auth";

const FavoritesTitle = styled(Typography.Title)`
  color: ${purple[2]} !important;
  font-family: "Montserrat", sans-serif;
`;

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: { id_in: user?.favorites },
  });

  const animes: Anime[] = data?.Page?.media;

  if (loading) {
    return (
      <Row gutter={[24, 24]} justify="center">
        <LoadingOutlined style={{ fontSize: "32px" }} />
      </Row>
    );
  }

  if (error) {
    return <>error loading favs...</>;
  }

  return (
    <>
      <Row>
        <FavoritesTitle level={2}>favs ♥</FavoritesTitle>
      </Row>
      <Row gutter={[24, 24]} justify="center">
        {!animes.length && <>No animes in favs</>}
        {animes?.map((anime: Anime) => (
          <Col key={anime.id}>
            <AnimeCard anime={anime} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Favorites;
