type Props = {
  label: string;
  styles?: string;
  onClick?: () => void;
};

const SubmitButton = ({ label, styles, onClick }: Props) => {
  return (
    <button
      style={{ backgroundColor: "#6FCE42" }}
      onClick={onClick}
      className={`rounded-lg text-gray-900 ml-3 my-2 px-3 py-1 font-bold ${styles}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
