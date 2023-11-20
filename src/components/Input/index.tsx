import { Container } from "./styles";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>;
};

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container
      ref={inputRef}
      placeholder="Digite o nome da turma"
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}
