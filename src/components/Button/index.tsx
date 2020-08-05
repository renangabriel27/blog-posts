import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, selected, ...rest }) => (
  <Container type="button" selected={selected} {...rest}>
    {children}
  </Container>
);

export default Button;
