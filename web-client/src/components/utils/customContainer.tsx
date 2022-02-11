type Props = {
  children: any;
  styles?: string;
};

const CustomContainer = ({ children, styles }: Props) => {
  if (children) {
    return <section className={`mb-4 ${styles && styles}`}>{children}</section>;
  } else return null;
};

export default CustomContainer;
