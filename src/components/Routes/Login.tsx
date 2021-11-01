import { Link, useHistory } from "react-router-dom";
import { useFormState } from "../../hooks/useFormState";
import store from "../../store";
import Button from "../Generic/Button";
import { TextInput } from "../Generic/Input";
import TextBlock from "../Generic/TextBlock";
import Title from "../Generic/Title";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";
import "./Login.scss";

const Login = () => {
  const history = useHistory();

  const [formValues, changeHandler] = useFormState({
    username: "",
    password: "",
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const isValidData = store.app.checkPassword(
      formValues.username,
      formValues.password
    );
    if (isValidData) {
      history.push("/write");
    }
  };

  return (
    <UnauthorizedWrapper>
      <Title text="Login" size="largest" />
      <form onSubmit={submitHandler}>
        <TextInput
          placeholder="Username"
          value={formValues.username}
          name="username"
          onChange={changeHandler}
          size="large"
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={formValues.password}
          name="password"
          onChange={changeHandler}
          size="large"
        />
        <TextBlock size="small">
          Your private key won't be uploaded to the servers.
        </TextBlock>
        <Button
          text="Login"
          size="large"
          type="submit"
          className="login__button"
        />
      </form>
      <hr />
      <TextBlock size="small">
        Don't have account? <Link to="/register">Register</Link>
      </TextBlock>
    </UnauthorizedWrapper>
  );
};

export default Login;
