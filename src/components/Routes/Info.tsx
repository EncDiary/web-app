import { FC } from "react";
import Container from "../Generic/Container/Container";
import MainContent from "../Generic/Container/MainContent";
import ExternalLink from "../Generic/ExternalLink";
import Checkbox from "../Generic/Input/Checkbox";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import UnorderedList from "../Generic/UnorderedList";
import "./Info.scss";

const Info: FC = () => {
  return (
    <MainContent>
      <section className="info">
        <Container>
          <InfoBlock>
            <Title text="Об EncDiary" />
            <TextBlock>
              Это приложение с открытым исходным кодом под лицензией{" "}
              <ExternalLink href="https://github.com/idefant/encdiary-web/blob/main/LICENSE">
                GNU GPLv3
              </ExternalLink>
              .
            </TextBlock>
            <TextBlock>
              Создано idefant. Связь с разработчиком:{" "}
              <ExternalLink href="https://idefant.ru">idefant.ru</ExternalLink>
            </TextBlock>
          </InfoBlock>

          <InfoBlock>
            <Title size="medium" text="Исходный код" align="left" />
            <UnorderedList
              items={[
                <>
                  <ExternalLink href="https://github.com/idefant/encdiary-web">
                    Web Frontend
                  </ExternalLink>{" "}
                  (main repo)
                </>,
                <ExternalLink href="https://github.com/idefant/encdiary-api">
                  API
                </ExternalLink>,
                <ExternalLink href="https://github.com/idefant/encdiary-landing">
                  Landing
                </ExternalLink>,
                <ExternalLink href="https://github.com/idefant/encdiary-admin">
                  Admin Panel
                </ExternalLink>,
              ]}
            />
          </InfoBlock>

          <InfoBlock>
            <Title
              size="medium"
              text="EncDiary создан с использованием следующих инструментов:"
              align="left"
            />
            <UnorderedList
              items={[
                "Create React App",
                "TypeScript",
                "React Router DOM",
                "MobX",
                "Axios",
                "HTML React Parser",
                "qs",
                "React Idle Timer",
              ]}
            />
          </InfoBlock>

          <InfoBlock>
            <Title size="small" text="Components" align="left" />
            <UnorderedList items={["TipTap", "React Modal", "Sweetalert2"]} />
          </InfoBlock>

          <InfoBlock>
            <Title size="small" text="Encryption" align="left" />
            <UnorderedList items={["CryptoJS", "JSEncrypt", "JsonWebToken"]} />
          </InfoBlock>

          <InfoBlock>
            <Title size="small" text="Styles" align="left" />
            <UnorderedList items={["Node Sass", "Normalize.css"]} />
          </InfoBlock>

          <InfoBlock>
            <Title size="medium" text="TODO" align="left" />
            <Checkbox disabled>Import</Checkbox>
            <Checkbox disabled>Change keypair</Checkbox>
            <Checkbox disabled>2FA (Password)</Checkbox>
            <Checkbox disabled>Mobile App</Checkbox>
          </InfoBlock>

          <InfoBlock>
            <Title
              size="medium"
              text="Поблагодарить разработчика"
              align="left"
            />
            <UnorderedList
              items={[
                <>
                  <b>Bitcoin</b>: bc1q5zk5m3tfgw5gt84jy344n6ddx25ywz3t8s4jt6
                </>,
                <>
                  <b>Ethereum</b>: 0xe19B7704BDB65Ca1e11149f1728A740e9FE4b092
                </>,
                <>
                  <b>BNB</b>: bnb15kkevtkqnplmn4upsjwyrgwkpf3ksrxhpy68sw
                </>,
                <>
                  <b>Monero</b>:
                  82bEmpVCrbeWgdAmYELWG3hRbx9Xby23YBJRVaiNsubvMuR9PJRUdngQnGpS68wARGRsqT2rHDZwCF1fBBDF6avdQiUR2f6
                </>,
              ]}
            />
          </InfoBlock>
        </Container>
      </section>
    </MainContent>
  );
};

const InfoBlock: FC = ({ children }) => {
  return <div className="info-block">{children}</div>;
};

export default Info;
