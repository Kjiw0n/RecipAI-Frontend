import styled from "@emotion/styled";

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Btn = ({ text, onClick, disabled = false }: Props) => {
  return (
    <BtnLayout>
      <Button onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </BtnLayout>
  );
};

export default Btn;

const BtnLayout = styled.div`
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;

  background-color: ${({ theme }) => theme.color.Green};
  color: ${({ theme }) => theme.color.Gray.white};
  font-size: 20px;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.color.Gray.gray4};
    cursor: not-allowed;
  }
`;
