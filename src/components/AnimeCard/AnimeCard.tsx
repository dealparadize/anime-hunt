import React from "react";
import { HeartOutlined, HeartFilled, StarFilled } from "@ant-design/icons";
import { Card, notification } from "antd";
import { Anime } from "../../types/Anime";
import { purple } from "@ant-design/colors";
import { truncate } from "lodash";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../context/Auth";

type AnimeCardProps = {
  anime: Anime;
};

const { Meta } = Card;

const StyledDescription = styled.div`
  height: 150px;
`;

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const { user, addFav, removeFav } = useAuth();
  const navigate = useNavigate();

  const isFav = user?.favorites.includes(anime.id);

  const handleNavigateAnime = () => navigate(`/anime/${anime.id}`);

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
        isFav ? (
          <HeartFilled
            onClick={handleUnfav}
            key="heart"
            style={{ color: "red", fontSize: "16px" }}
          />
        ) : (
          <HeartOutlined
            onClick={handleFav}
            key="heart"
            style={{ fontSize: "16px" }}
          />
        ),
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

export default React.memo(AnimeCard);
