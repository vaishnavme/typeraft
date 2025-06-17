type MonoButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type NormalButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const MonoButton = (props: MonoButtonProps) => (
  <button
    type="button"
    {...props}
    className="p-0.5 flex items-center gap-x-1 text-xs select-none hover:opacity-100 opacity-70 transition-opacity duration-150 mono text-accent"
  />
);

const Primary = (props: NormalButtonProps) => (
  <button
    type="button"
    className="text-sm font-medium flex items-center justify-center text-center text-white bg-accent px-3 py-1 rounded-lg h-8 border border-border hover:border-accent transition-all"
    {...props}
  />
);

const Secondary = (props: NormalButtonProps) => (
  <button
    type="button"
    className="text-sm font-medium flex items-center justify-center text-center bg-background-secondary px-3 py-1 rounded-lg h-8 border border-border hover:border-accent transition-all"
    {...props}
  />
);

MonoButton.displayName = "MonoButton";
Primary.displayName = "PrimaryButton";
Secondary.displayName = "SecondaryButton";

const Button = {
  MonoButton,
  Primary,
  Secondary,
};

export default Button;
