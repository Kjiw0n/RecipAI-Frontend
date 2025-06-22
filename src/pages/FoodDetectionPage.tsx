import Icn from "@/assets";
import Btn from "@/components/Btn";
import { Line } from "@/components/Line";
import ListItem from "@/components/ListItem";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { recommendMenus } from "@/apis/axios";

type Props = {};

const FoodDetectionPage = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([]);
  const [manualIngredients, setManualIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 이전 페이지에서 전달받은 재료 목록이 있는지 확인
    if (location.state?.ingredients) {
      setDetectedIngredients(location.state.ingredients);
      setAllIngredients(location.state.ingredients);
    }
  }, [location.state]);

  const handleDeleteDetected = (index: number) => {
    const updated = detectedIngredients.filter((_, i) => i !== index);
    setDetectedIngredients(updated);
    setAllIngredients([...updated, ...manualIngredients]);
  };

  const handleDeleteManual = (index: number) => {
    const updated = manualIngredients.filter((_, i) => i !== index);
    setManualIngredients(updated);
    setAllIngredients([...detectedIngredients, ...updated]);
  };

  const handleAddIngredient = () => {
    if (
      newIngredient.trim() &&
      !allIngredients.includes(newIngredient.trim())
    ) {
      const updated = [...manualIngredients, newIngredient.trim()];
      setManualIngredients(updated);
      setAllIngredients([...detectedIngredients, ...updated]);
      setNewIngredient("");
    }
  };

  const handleRecommendRecipes = async () => {
    if (allIngredients.length === 0) {
      alert("최소 하나의 재료를 추가해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await recommendMenus(allIngredients);
      console.log("추천 메뉴:", response.responseMenus);
      navigate("/recommend-recipe", {
        state: {
          menus: response.responseMenus,
          ingredients: allIngredients,
        },
      });
    } catch (error: any) {
      console.error("API 호출 오류:", error);
      const message =
        error.response?.data?.message || "메뉴 추천 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FoodDetectionPageLayout>
      <IcnBackArrowWrapper onClick={() => navigate(-1)}>
        <Icn.IcnBackArrow width={24} height={24} />
      </IcnBackArrowWrapper>

      <DetectionImgContainer>
        <ImgWrapper>
          {location.state?.imageFile ? (
            <PreviewImage
              src={URL.createObjectURL(location.state.imageFile)}
              alt="업로드된 이미지"
            />
          ) : (
            <Icn.SampleImg width={150} height={150} />
          )}
        </ImgWrapper>
      </DetectionImgContainer>

      {/* Section1 */}
      <Title>재료 인식 결과</Title>
      <Line />

      {detectedIngredients.length > 0 ? (
        detectedIngredients.map((ingredient, index) => (
          <ListItem
            key={`detected-${index}`}
            ItemName={ingredient}
            ItemInfo="자동 인식된 재료"
            onDelete={() => handleDeleteDetected(index)}
          />
        ))
      ) : (
        <EmptyMessage>인식된 재료가 없습니다.</EmptyMessage>
      )}

      <DescWrapper>
        <Desc>
          YOLO를 통해 분석한 재료 목록은 다음과 같습니다. <br />
          <br />
          잘못 인식된 재료가 있다면 삭제해 주세요. <br />
          직접 추가하고 싶은 재료가 있다면 아래 입력창에 1개씩 입력해주세요.
        </Desc>
      </DescWrapper>

      <Line />

      {/* Section2 */}
      <Title>직접 재료 추가하기</Title>
      <Line />

      <AddIngredientContainer>
        <AddIngredientInput
          type="text"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder="재료명을 입력하세요"
          onKeyPress={(e) => e.key === "Enter" && handleAddIngredient()}
        />
        <AddIngredientBtn onClick={handleAddIngredient}>
          추가
          <Icn.IcnPlus width={20} height={20} />
        </AddIngredientBtn>
      </AddIngredientContainer>

      {manualIngredients.map((ingredient, index) => (
        <ListItem
          key={`manual-${index}`}
          ItemName={ingredient}
          ItemInfo="직접 추가한 재료"
          onDelete={() => handleDeleteManual(index)}
        />
      ))}

      <Btn
        text={isLoading ? "추천 중..." : "레시피 추천받기"}
        onClick={handleRecommendRecipes}
        disabled={allIngredients.length === 0 || isLoading}
      />
    </FoodDetectionPageLayout>
  );
};

export default FoodDetectionPage;

const FoodDetectionPageLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const IcnBackArrowWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 25px;
  display: flex;
  justify-content: flex-start;

  width: 100%;
`;

const DetectionImgContainer = styled.div`
  padding: 130px 0 60px 0;
  border-radius: 0 0 25px 25px;
  background-color: ${({ theme }) => theme.color.Gray.gray2};
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.p`
  margin: 20px;
  font-size: 20px;
  font-weight: 600;
`;

const Desc = styled.p`
  line-height: 18px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.Gray.gray7};
`;

const DescWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.color.Gray.gray6};
  font-size: 14px;
`;

const AddIngredientContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 25px;
`;

const AddIngredientInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid ${({ theme }) => theme.color.Gray.gray4};
  border-radius: 10px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.Green};
  }
`;

const AddIngredientBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.Green};
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.Green}dd;
  }
`;

const PreviewImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;
