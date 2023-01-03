import React from "react";
import { HeartOutlined, StarFilled } from "@ant-design/icons";
import { Card } from "antd";
import { Anime } from "../../types/Anime";
import { purple } from "@ant-design/colors";
import { truncate } from "lodash";
import styled from "styled-components";

type AnimeCardProps = {
  anime: Anime;
};

const { Meta } = Card;

const StyledDescription = styled.div`
  height: 150px;
`;

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => (
  <Card
    style={{ width: 300 }}
    cover={<img alt="example" src={anime?.coverImage?.extraLarge} />}
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
      title={anime?.title?.english}
      description={
        <StyledDescription>
          {truncate(anime?.description, { length: 250 })}
        </StyledDescription>
      }
    />
  </Card>
);

export default AnimeCard;