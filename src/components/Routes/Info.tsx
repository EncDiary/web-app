import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import store from "../../store";
import Container from "../Generic/Container";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

const Info: FC = () => {
  const history = useHistory();

  useEffect(() => {
    if (!store.app.account) {
      history.push("/login");
    }
  }, [history]);

  return (
    <>
      <Header />
      <MainContent type="info">
        <section className="info">
          <Container>
            <Title text="Info about EncDiary" />
            <TextBlock>
              There will be information about EncDiary. (This page isn't ready
              yet)
            </TextBlock>
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default Info;
