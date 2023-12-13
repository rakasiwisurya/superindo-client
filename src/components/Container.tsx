import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

interface IContainer extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

const Container = ({ children, className, ...rest }: IContainer) => {
  return (
    <div {...rest} className={`container${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
};

export default Container;
