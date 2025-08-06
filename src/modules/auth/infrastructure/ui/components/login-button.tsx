import { firebaseAuthRepository } from "../../services/firebase.auth.repository";
import { Button } from "../../../../../components/button.component";

const SignInButton = () => {
  const handleClick = () => {
    firebaseAuthRepository.signIn();
  };

  return (
    <Button
      label="Iniciar sesión con Google"
      onClick={handleClick}
      type="button"
    />
  );
};

export { SignInButton };
