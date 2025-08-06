interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="py-2 px-4 rounded cursor-pointer hover:bg-blue-500 bg-blue-600 text-white transition-colors"
    >
      {label}
    </button>
  );
};

export { Button };
