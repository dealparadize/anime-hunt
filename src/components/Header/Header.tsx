import React, { useState } from "react";
import { Col, Row, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { purple } from "@ant-design/colors";
import { UserOutlined } from "@ant-design/icons";
import logo from "logo.svg";
import styled from "styled-components";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import LoginModal from "../LoginModal/LoginModal";

const Title = styled.h1`
  font-family: "Rubik Vinyl", cursive;
  font-size: 3rem;
  color: palevioletred;
`;

const StyledHeader = styled.header`
  margin-bottom: 48px;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const onShowLoginModal = () => setShowLoginModal(true);
  const onHideLoginModal = () => setShowLoginModal(false);

  const handleNavigateRoot = () => navigate("/");

  const handleNavigateFavs = () => navigate("/favs");

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={handleNavigateFavs}>favs</a>,
    },
    {
      key: "2",
      label: <a>logout</a>,
    },
    {
      key: "3",
      label: <a onClick={onShowLoginModal}>login</a>,
    },
  ];

  return (
    <>
      <LoginModal open={showLoginModal} onClose={onHideLoginModal} />
      <StyledHeader>
        <Row align="middle">
          <Col span={8}>
            <img
              style={{ cursor: "pointer" }}
              src={logo}
              className="App-logo"
              alt="logo"
              onClick={handleNavigateRoot}
            />
          </Col>
          <Col span={8}>
            <Row justify="center">
              <Title>anime-hunt</Title>
            </Row>
          </Col>
          <Col span={8}>
            <Row justify="end">
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Avatar
                  style={{ backgroundColor: purple[3] }}
                  size="large"
                  icon={<UserOutlined />}
                />
              </Dropdown>
            </Row>
          </Col>
        </Row>
      </StyledHeader>
    </>
  );
};

export default Header;
