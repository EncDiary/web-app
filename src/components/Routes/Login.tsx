import { Link, useHistory } from "react-router-dom";
import { useFormState } from "../../hooks/useFormState";
import store from "../../store";
import Button from "../Generic/Button";
import Explanation from "../Generic/Explanation";
import { TextInput } from "../Generic/Input";
import Title from "../Generic/Title";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";

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
      <Title text="Login" />
      <form onSubmit={submitHandler}>
        <TextInput
          placeholder="Username"
          value={formValues.username}
          name="username"
          onChange={changeHandler}
        />
        <TextInput
          placeholder="Password"
          type="password"
          value={formValues.password}
          name="password"
          onChange={changeHandler}
        />
        <Explanation>
          Your private key won't be uploaded to the servers.
        </Explanation>
        <Button text="Login" size="large" type="submit" />
      </form>
      <hr />
      <Explanation>
        Don't have account? <Link to="/register">Register</Link>
      </Explanation>
    </UnauthorizedWrapper>
  );
};

export default Login;
