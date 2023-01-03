import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIME } from "../gql/queries/movies";
import { Anime } from "../types/Anime";
import { Row, Typography, Image, Tag } from "antd";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { purple, magenta } from "@ant-design/colors";
import styled from "styled-components";

const AnimeTitle = styled(Typography.Title)`
  color: ${purple[3]} !important;
  font-family: "Montserrat", sans-serif;
`;

const AnimeResume: React.FC = () => {
  const params = useParams();

  const { loading, error, data } = useQuery(GET_ANIME, {
    variables: { id: params.id },
  });

  const anime: Anime = data?.Media;

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
    <>
      <Row justify="center">
        <AnimeTitle>{anime?.title?.english}</AnimeTitle>
      </Row>

      <Row justify="center">
        <Image width={976} src={anime?.bannerImage} />
      </Row>

      <Row justify="center">{anime?.description}</Row>

      <Row justify="center">
        {anime?.genres?.map((genre) => (
          <Tag key={genre} color={magenta[2]}>
            {genre}
          </Tag>
        ))}
      </Row>
    </>
  );
};

export default AnimeResume;
