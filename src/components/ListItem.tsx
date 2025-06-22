import Icn from "@/assets";
import styled from "@emotion/styled";

type Props = {
  ItemName: string;
  ItemInfo: string;
  onDelete?: () => void;
};

const ListItem = ({ ItemName, ItemInfo, onDelete }: Props) => {
  return (
    <ListItemLayout>
      <ItemContainer>
        <Icn.SampleImg width={60} height={60} />
        <TextContainer>
          <Title>{ItemName}</Title>
          <Desc>{ItemInfo}</Desc>
        </TextContainer>
      </ItemContainer>
      {onDelete && (
        <DeleteButton onClick={onDelete}>
          <Icn.IcnMinus width={45} height={45} />
        </DeleteButton>
      )}
    </ListItemLayout>
  );
};

export default ListItem;

const ListItemLayout = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px;

  border-bottom: 1px solid ${({ theme }) => theme.color.Gray.gray4};
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
  font-weight: 600;
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.Gray.gray7};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 35px;
  right: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
