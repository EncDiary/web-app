import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Redirect } from "react-router-dom";
import store from "../../store";
import Container from "../Generic/Container";
import Header from "../Generic/Header";
import MainContent from "../Generic/MainContent";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";

const Info: FC = observer(() => {
  const account = store.appStore.account;
  if (!account) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header account={account} />
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
});

export default Info;
