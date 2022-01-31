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
            <Title>Об EncDiary</Title>
            <TextBlock>
              Это приложение с открытым исходным кодом под лицензией{" "}
              <ExternalLink href="https://github.com/EncDiary/web-app/blob/main/LICENSE">
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
            <Title size="medium" align="left">
              Исходный код
            </Title>
            <UnorderedList
              items={[
                <>
                  <ExternalLink href="https://github.com/EncDiary/web-app">
                    Web Frontend
                  </ExternalLink>{" "}
                  (main repo)
                </>,
                <ExternalLink href="https://github.com/EncDiary/api">
                  API
                </ExternalLink>,
                <ExternalLink href="https://github.com/EncDiary/landing">
                  Landing
                </ExternalLink>,
                <ExternalLink href="https://github.com/EncDiary/admin-panel">
                  Admin Panel
                </ExternalLink>,
              ]}
            />
          </InfoBlock>

          <InfoBlock>
            <Title size="medium" align="left">
              EncDiary создан с использованием следующих инструментов:
            </Title>
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
            <Title size="small" align="left">
              Components
            </Title>
            <UnorderedList items={["TipTap", "React Modal", "Sweetalert2"]} />
          </InfoBlock>

          <InfoBlock>
            <Title size="small" align="left">
              Encryption
            </Title>
            <UnorderedList items={["CryptoJS", "JSEncrypt", "jwt-decode"]} />
          </InfoBlock>

          <InfoBlock>
            <Title size="small" align="left">
              Styles
            </Title>
            <UnorderedList items={["Node Sass", "Normalize.css"]} />
          </InfoBlock>

          <InfoBlock>
            <Title size="medium" align="left">
              TODO
            </Title>
            <Checkbox disabled>Import</Checkbox>
            <Checkbox disabled>Change keypair</Checkbox>
            <Checkbox disabled>2FA (Password)</Checkbox>
            <Checkbox disabled>Mobile App</Checkbox>
          </InfoBlock>

          <InfoBlock>
            <Title size="medium" align="left">
              Поблагодарить разработчика
            </Title>
            <UnorderedList
              itemClassName="info-donate-item"
              items={[
                <InfoDonateItem
                  coin="Bitcoin"
                  address="bc1q5zk5m3tfgw5gt84jy344n6ddx25ywz3t8s4jt6"
                />,
                <InfoDonateItem
                  coin="Ethereum"
                  address="0xe19B7704BDB65Ca1e11149f1728A740e9FE4b092"
                />,
                <InfoDonateItem
                  coin="BNB"
                  address="bnb15kkevtkqnplmn4upsjwyrgwkpf3ksrxhpy68sw"
                />,
                <InfoDonateItem
                  coin="Monero"
                  address="82bEmpVCrbeWgdAmYELWG3hRbx9Xby23YBJRVaiNsubvMuR9PJRUdngQnGpS68wARGRsqT2rHDZwCF1fBBDF6avdQiUR2f6"
                />,
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

interface InfoDonateItemProps {
  coin: string;
  address: string;
}

const InfoDonateItem: FC<InfoDonateItemProps> = ({ coin, address }) => {
  return (
    <>
      <b>{coin}</b>:{" "}
      <span className="info-donate-item__address">{address}</span>
    </>
  );
};

export default Info;
