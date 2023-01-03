import React, { useState } from "react";
import { Col, Row, Avatar, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { purple } from "@ant-design/colors";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import logo from "logo.svg";
import styled from "styled-components";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import LoginModal from "../LoginModal/LoginModal";
import useAuth from "../../context/Auth";

const Title = styled.h1`
  font-family: "Rubik Vinyl", cursive;
  font-size: 3rem;
  color: palevioletred;

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const StyledHeader = styled.header`
  margin-bottom: 48px;
`;

const { Text } = Typography;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const onShowLoginModal = () => setShowLoginModal(true);
  const onHideLoginModal = () => setShowLoginModal(false);

  const handleNavigateRoot = () => navigate("/");

  const handleNavigateFavs = () => navigate("/favs");

  const handleLogout = () => {
    logout().then(() => {
      notification.success({
        message: "Logged out successfully",
        placement: "bottomRight",
      });
    });
  };

  const items: MenuProps["items"] = user
    ? [
        {
          key: "1",
          label: <a onClick={handleNavigateFavs}>favs</a>,
        },
        {
          key: "2",
          label: <a onClick={handleLogout}>logout</a>,
        },
      ]
    : [
        {
          key: "1",
          label: <a onClick={onShowLoginModal}>login</a>,
        },
      ];

  return (
    <>
      <LoginModal open={showLoginModal} onClose={onHideLoginModal} />
      <StyledHeader>
        <Row align="middle">
          <Col xs={{ order: 1, span: 8 }} md={{ span: 8 }}>
            <img
              style={{ cursor: "pointer" }}
              src={logo}
              className="App-logo"
              alt="logo"
              onClick={handleNavigateRoot}
            />
          </Col>
          <Col xs={{ order: 2, span: 16 }} md={{ span: 8 }}>
            <Row justify="center">
              <Title>anime-hunt</Title>
            </Row>
          </Col>
          <Col xs={{ order: 3, span: 24 }} md={{ span: 8 }}>
            <Row justify="end" align="middle">
              {user && (
                <Text style={{ marginRight: "1rem" }}>{user?.user}</Text>
              )}
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Avatar
                  style={{ backgroundColor: user ? purple[3] : purple[0] }}
                  size="large"
                  icon={
                    user ? (
                      <UserOutlined />
                    ) : (
                      <LoginOutlined style={{ color: purple[5] }} />
                    )
                  }
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
