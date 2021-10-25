import Button from "../Generic/Button";
import Explanation from "../Generic/Explanation";
import { TextInput, FileInput } from "../Generic/Input";
import Title from "../Generic/Title";
import UnauthorizedWrapper from "../Generic/UnauthorizedWrapper";

const Login = () => {
  return (
    <UnauthorizedWrapper>
      <Title text="Login" />
      <TextInput placeholder="Username" />
      <FileInput description="Private Key" />
      <Explanation text="Your private key won't be uploaded to the servers." />
      <Button text="Login" />
      <hr />
      <Explanation text="Don't have account? Register" />
    </UnauthorizedWrapper>
  );
};

export default Login;
