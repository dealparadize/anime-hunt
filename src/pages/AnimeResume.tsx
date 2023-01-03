import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ANIME } from "../gql/queries/movies";
import { Anime } from "../types/Anime";
import {
  Row,
  Col,
  Typography,
  Image,
  Tag,
  Descriptions,
  Card,
  notification,
} from "antd";
import { useParams } from "react-router-dom";
import { LoadingOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { purple, magenta } from "@ant-design/colors";
import styled from "styled-components";
import useAuth from "../context/Auth";

const AnimeTitle = styled(Typography.Title)`
  color: ${purple[3]} !important;
  font-family: "Montserrat", sans-serif;
  margin: 0 !important;
`;

const AnimeSubtitle = styled(Typography.Title)`
  color: ${purple[2]} !important;
  font-family: "Montserrat", sans-serif;
  margin: 0;
`;

const { Meta } = Card;

const AnimeResume: React.FC = () => {
  const params = useParams();
  const { user, addFav, removeFav } = useAuth();

  const { loading, error, data } = useQuery(GET_ANIME, {
    variables: { id: params.id },
  });

  const anime: Anime = data?.Media;

  const isFav = user?.favorites.includes(anime?.id ?? "");

  const handleFav = () => {
    if (!user) {
      notification.warning({
        message: "Login to fav",
        description: "Mark favs is only allowed for users",
        placement: "bottomRight",
      });
    }

    addFav(anime?.id);
  };

  const handleUnfav = () => {
    removeFav(anime?.id);
  };

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

  console.log({ anime });

  return (
    <>
      <Row gutter={[32, 32]} justify="center">
        <Col sm={24} md={6} lg={6}>
          <Row justify="center" style={{ marginBottom: "32px" }}>
            <Image width={300} src={anime?.coverImage?.extraLarge} />
          </Row>
          <Row justify="center" style={{ marginBottom: "48px" }}>
            <Descriptions
              title="Anime Info"
              column={{ xs: 1, sm: 1, md: 1 }}
              bordered
            >
              <Descriptions.Item label="Format">
                {anime.format}
              </Descriptions.Item>
              <Descriptions.Item label="Episodes">
                {anime.episodes}
              </Descriptions.Item>
              <Descriptions.Item label="Episode Duration">
                {anime.duration}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {anime.status}
              </Descriptions.Item>
              <Descriptions.Item label="Average Score">
                {anime.averageScore}
              </Descriptions.Item>
            </Descriptions>
          </Row>

          <Row justify="center">
            {anime?.genres?.map((genre) => (
              <Tag
                key={genre}
                color={magenta[2]}
                style={{ marginBottom: "8px" }}
              >
                {genre}
              </Tag>
            ))}
          </Row>
        </Col>
        <Col sm={24} md={18} lg={18}>
          <Row justify="center" align="middle">
            <AnimeTitle>{anime?.title?.english}</AnimeTitle>{" "}
            {isFav ? (
              <HeartFilled
                onClick={handleUnfav}
                key="heart"
                style={{ color: "red", fontSize: "32px" }}
              />
            ) : (
              <HeartOutlined
                onClick={handleFav}
                key="heart"
                style={{ fontSize: "32px" }}
              />
            )}
          </Row>

          <Row justify="center" style={{ marginBottom: "48px" }}>
            {anime?.description}
          </Row>

          <Row justify="center">
            <AnimeSubtitle level={2}>characters</AnimeSubtitle>
          </Row>

          <Row
            justify="center"
            gutter={[24, 24]}
            style={{ marginBottom: "48px" }}
          >
            {anime?.characters?.nodes?.map((character) => (
              <Col>
                <Card
                  hoverable
                  style={{ width: 150 }}
                  cover={
                    <img
                      alt={character?.name?.full}
                      src={character?.image?.large}
                    />
                  }
                >
                  <Meta title={character?.name?.full} />
                </Card>
              </Col>
            ))}
          </Row>

          <Row justify="center">
            <AnimeSubtitle level={2}>staff</AnimeSubtitle>
          </Row>

          <Row
            justify="center"
            gutter={[24, 24]}
            style={{ marginBottom: "48px" }}
          >
            {anime?.staff?.nodes?.map((person) => (
              <Col>
                <Card
                  hoverable
                  style={{ width: 150 }}
                  cover={
                    <img alt={person?.name?.full} src={person?.image?.large} />
                  }
                >
                  <Meta
                    title={person?.name?.full}
                    description={person?.primaryOccupations?.join(", ")}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default AnimeResume;
