interface MonoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const MonoButton = (props: MonoButtonProps) => {
  const { children, ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className="p-0.5 flex items-center gap-x-1 text-xs select-none hover:opacity-100 opacity-70 transition-opacity duration-150 jetbrains-mono text-accent"
    >
      {children}
    </button>
  );
};

const Button = {
  MonoButton,
};

export default Button;
