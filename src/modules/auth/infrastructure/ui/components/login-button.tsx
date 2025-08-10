import { firebaseAuthRepository } from "../../services/firebase.auth.repository";
import { FcGoogle } from "react-icons/fc";

const SignInButton = () => {
  const handleClick = () => {
    firebaseAuthRepository.signIn();
  };

  return (
    <button
      className="btn bg-white text-black border-[#e5e5e5] btn-sm"
      onClick={handleClick}
    >
      <FcGoogle />
      Iniciar Sesión
    </button>
  );
};

export { SignInButton };
