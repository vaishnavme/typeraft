import Text from "./text";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  subText?: string;
}

const Input = (props: InputProps) => {
  const { id, label, subText, ...rest } = props;
  return (
    <div className="flex flex-col gap-y-0.5">
      <label htmlFor={id}>
        <Text medium>{label}</Text>
      </label>
      <input
        id={id}
        className="text-sm bg-background-secondary hover:bg-background px-3 rounded-lg h-8 border border-border focus-within:outline-none hover:border-accent transition-all"
        {...rest}
      />
      {subText ? (
        <Text xs className="text-secondary">
          {subText}
        </Text>
      ) : null}
    </div>
  );
};

Input.displayName = "Input";

export default Input;
