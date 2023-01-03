import React from "react";
import { HeartOutlined, StarFilled } from "@ant-design/icons";
import { Card } from "antd";
import { Anime } from "../../types/Anime";
import { purple } from "@ant-design/colors";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type AnimeCardProps = {
  anime: Anime;
};

const { Meta } = Card;

const StyledDescription = styled.div`
  height: 150px;
`;

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const navigate = useNavigate();

  const handleNavigateAnime = () => navigate(`/anime/${anime.id}`);

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          onClick={handleNavigateAnime}
          alt="example"
          src={anime?.coverImage?.extraLarge}
        />
      }
      hoverable
      actions={[
        <HeartOutlined key="heart" />,
        <>
          {anime?.averageScore}{" "}
          <StarFilled key="star" style={{ color: purple[5], width: "auto" }} />
        </>,
      ]}
    >
      <Meta
        title={
          <span onClick={handleNavigateAnime}>
            {anime?.title?.english ?? anime?.title?.native}
          </span>
        }
        description={
          <StyledDescription>
            {truncate(anime?.description, { length: 250 })}
          </StyledDescription>
        }
      />
    </Card>
  );
};

export default AnimeCard;
