import { firebaseAuthRepository } from "../../services/firebase.auth.repository";

export const SignOutButton = () => {
  const handleClick = () => {
    firebaseAuthRepository.signOut();
  };

  return (
    <button
      className="btn btn-outline btn-error btn-sm"
      onClick={handleClick}
      type="button"
    >
      Cerrar sesión
    </button>
  );
};
