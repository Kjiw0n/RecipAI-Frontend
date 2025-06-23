import Icn from "@/assets";
import styled from "@emotion/styled";
import { useState } from "react";

type Props = {
  ItemName: string;
  ItemInfo: string;
  onDelete?: () => void;
  onUpdate?: (newItemName: string) => void;
};

const ListItem = ({ ItemName, ItemInfo, onDelete, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(ItemName);

  const handleUpdate = () => {
    if (editedName.trim() !== "" && onUpdate) {
      onUpdate(editedName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate();
    }
  };

  return (
    <ListItemLayout>
      <ItemContainer>
        <Icn.SampleImg width={60} height={60} />
        <TextContainer>
          {isEditing ? (
            <EditInput
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <Title>{ItemName}</Title>
          )}
          <Desc>{ItemInfo}</Desc>
        </TextContainer>
      </ItemContainer>
      <ButtonContainer>
        {onUpdate && !isEditing && (
          <ModifyButton onClick={() => setIsEditing(true)}>
            <Icn.IcnModify width={20} height={20} />
          </ModifyButton>
        )}
        {onDelete && (
          <DeleteButton onClick={onDelete}>
            <Icn.IcnMinus width={45} height={45} />
          </DeleteButton>
        )}
      </ButtonContainer>
    </ListItemLayout>
  );
};

export default ListItem;

const ListItemLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const EditInput = styled.input`
  font-size: 16px;
  font-weight: 600;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.Gray.gray1};
`;

const Desc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.color.Gray.gray7};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ModifyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled.button`
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
