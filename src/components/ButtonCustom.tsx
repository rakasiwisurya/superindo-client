import { Button, ButtonProps } from "antd";

type TVariant =
  | "primary"
  | "outline-primary"
  | "danger"
  | "outline-danger"
  | "warning"
  | "outline-warning"
  | "success"
  | "outline-success"
  | "info"
  | "outline-info"
  | "secondary"
  | "outline-secondary"
  | "indigo"
  | "outline-indigo"
  | "violet"
  | "outline-violet";

interface IButtonCustom extends ButtonProps {
  variant?: TVariant;
}

const ButtonCustom = ({ children, variant, ...rest }: IButtonCustom) => {
  if (variant === "outline-violet") {
    return (
      <Button {...rest} type="default" className="btn-outline-violet">
        {children}
      </Button>
    );
  }

  if (variant === "violet") {
    return (
      <Button {...rest} type="primary" className="btn-violet">
        {children}
      </Button>
    );
  }

  if (variant === "outline-indigo") {
    return (
      <Button {...rest} type="default" className="btn-outline-indigo">
        {children}
      </Button>
    );
  }

  if (variant === "indigo") {
    return (
      <Button {...rest} type="primary" className="btn-indigo">
        {children}
      </Button>
    );
  }

  if (variant === "outline-secondary") {
    return (
      <Button {...rest} type="default" className="btn-outline-secondary">
        {children}
      </Button>
    );
  }

  if (variant === "secondary") {
    return (
      <Button {...rest} type="primary" className="btn-secondary">
        {children}
      </Button>
    );
  }

  if (variant === "outline-info") {
    return (
      <Button {...rest} type="default" className="btn-outline-info">
        {children}
      </Button>
    );
  }

  if (variant === "info") {
    return (
      <Button {...rest} type="primary" className="btn-info">
        {children}
      </Button>
    );
  }

  if (variant === "outline-success") {
    return (
      <Button {...rest} type="default" className="btn-outline-success">
        {children}
      </Button>
    );
  }

  if (variant === "success") {
    return (
      <Button {...rest} type="primary" className="btn-success">
        {children}
      </Button>
    );
  }

  if (variant === "outline-warning") {
    return (
      <Button {...rest} type="default" className="btn-outline-warning">
        {children}
      </Button>
    );
  }

  if (variant === "warning") {
    return (
      <Button {...rest} type="primary" className="btn-warning">
        {children}
      </Button>
    );
  }

  if (variant === "outline-danger") {
    return (
      <Button {...rest} type="default" danger>
        {children}
      </Button>
    );
  }

  if (variant === "danger")
    return (
      <Button {...rest} type="primary" danger>
        {children}
      </Button>
    );

  if (variant === "outline-primary") {
    return (
      <Button {...rest} type="default">
        {children}
      </Button>
    );
  }

  return (
    <Button {...rest} type="primary">
      {children}
    </Button>
  );
};

export default ButtonCustom;
