import { Button } from "../../../../shared/infrastructure/ui/components/button";
import { firebaseAuthRepository } from "../../services/firebase.auth.repository";

export const SignOutButton = () => {
  const handleClick = () => {
    firebaseAuthRepository.signOut();
  };

  return <Button label="Cerrar sesión" onClick={handleClick} type="button" />;
};
