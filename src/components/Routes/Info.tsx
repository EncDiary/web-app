import { FC } from "react";
import Container from "../Generic/Container";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

const Info: FC = () => {
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
