import Icn from "@/assets";
import styled from "@emotion/styled";

type Props = {
  ItemName: string;
  ItemInfo: string;
  checked?: boolean;
  onClick?: () => void;
};

const RecipeItem = ({ ItemName, ItemInfo, checked = true, onClick }: Props) => {
  return (
    <ListItemLayout onClick={onClick} clickable={!!onClick}>
      <ItemContainer>
        <Icn.SampleImg width={60} height={60} />
        <TextContainer>
          <Title>{ItemName}</Title>
          <Desc>{ItemInfo}</Desc>
        </TextContainer>
      </ItemContainer>
      {checked && (
        <Icn.IcnCheckBoxCheck
          width={45}
          height={45}
          style={{ position: "absolute", top: "35px", right: "30px" }}
        />
      )}

      {!checked && (
        <Icn.IcnCheckBoxUnCheck
          width={45}
          height={45}
          style={{ position: "absolute", top: "35px", right: "30px" }}
        />
      )}
    </ListItemLayout>
  );
};

export default RecipeItem;

const ListItemLayout = styled.div<{ clickable?: boolean }>`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px;

  border-bottom: 1px solid ${({ theme }) => theme.color.Gray.gray4};

  ${({ clickable, theme }) =>
    clickable &&
    `
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: ${theme.color.Gray.gray1};
    }
  `}
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  gap: 10px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.Gray.gray7};
`;
