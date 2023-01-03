import React from "react";
import Lottie from "lottie-react";
import { Input, Row, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { purple } from "@ant-design/colors";
import japanScene from "../lottie/japan-scene.json";
import styled from "styled-components";
import AnimeSearchResults from "../components/AnimeSearchResults/AnimeSearchResults";

const { Search } = Input;

const SearchRow = styled(Row)`
  margin-bottom: 120px;
`;

const LottieRow = styled(Row)`
  margin-bottom: 0px;
`;

const LottieWrapper = styled.div`
  width: 600px;
  height: auto;
`;

const LottieTypography = styled(Typography.Title)`
  color: ${purple[2]} !important;
  font-family: "Montserrat", sans-serif;
`;

const HeroSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("s");

  const onSearch = (value: string) => setSearchParams({ s: value });

  return (
    <>
      <SearchRow justify="center">
        <Search
          placeholder="search for your anime..."
          enterButton
          size="large"
          onSearch={onSearch}
          style={{ width: "400px" }}
        />
      </SearchRow>

      {!search && (
        <div>
          <LottieRow justify="center">
            <LottieWrapper>
              <Lottie animationData={japanScene} loop={true} />
            </LottieWrapper>
          </LottieRow>
          <Row justify="center">
            <LottieTypography level={2}>
              look for animes in the most powerful engine
            </LottieTypography>
          </Row>
        </div>
      )}

      {search && <AnimeSearchResults search={search} />}
    </>
  );
};

export default HeroSearch;
