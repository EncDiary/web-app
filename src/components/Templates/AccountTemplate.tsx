import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import store from "../../store";
import Header from "../Generic/Header";

const AccountTemplate: FC = observer(() => {
  const account = store.userStore.account;
  if (!account) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header account={account} />
      <Outlet context={account} />
    </>
  );
});

export default AccountTemplate;
