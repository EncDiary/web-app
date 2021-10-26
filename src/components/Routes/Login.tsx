import { Link } from "react-router-dom";
import { PrimaryButton } from "../Generic/Button";
import Explanation from "../Generic/Explanation";
import { TextInput } from "../Generic/Input";
import Title from "../Generic/Title";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";

const Login = () => {
  return (
    <UnauthorizedWrapper>
      <Title text="Login" />
      <TextInput placeholder="Username" type="text" />
      <TextInput placeholder="Password" type="password" />
      <Explanation>
        Your private key won't be uploaded to the servers.
      </Explanation>
      <PrimaryButton text="Login" />
      <hr />
      <Explanation>
        Don't have account? <Link to="/register">Register</Link>
      </Explanation>
    </UnauthorizedWrapper>
  );
};

export default Login;
