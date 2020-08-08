import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container, ErrorMessage } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Textarea: React.FC<TextareaProps> = ({ name, icon: Icon, ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [value, setValue] = useState('');

  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!textareaRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });

    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [fieldName, registerField, defaultValue]);

  return (
    <div>
      <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
        {Icon && <Icon size={20} />}
        <textarea
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={textareaRef}
          defaultValue={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          {...rest}
        />
      </Container>
      {!!error && <ErrorMessage>* {error}</ErrorMessage>}
    </div>
  );
};

export default Textarea;
