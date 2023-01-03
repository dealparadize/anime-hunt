import React from "react";
import AnimeCard from "../AnimeCard/AnimeCard";
import { useQuery } from "@apollo/client";
import { GET_ANIMES } from "../../gql/queries/movies";
import { Anime } from "../../types/Anime";
import { Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type AnimeSearchResultsProps = { search?: string };

const AnimeSearchResults: React.FC<AnimeSearchResultsProps> = ({ search }) => {
  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: { search: search },
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
    return <>error loading animes...</>;
  }

  return (
    <Row gutter={[24, 24]} justify="center">
      {!animes?.length && <>no animes found!</>}
      {animes?.map((anime: Anime) => (
        <Col key={anime?.id}>
          <AnimeCard anime={anime} />
        </Col>
      ))}
    </Row>
  );
};

export default AnimeSearchResults;
