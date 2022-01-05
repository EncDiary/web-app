import { FC } from "react";
import Container from "../Generic/Container";
import MainContent from "../Generic/MainContent";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

const Info: FC = () => {
  return (
    <MainContent>
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
  );
};

export default Info;
