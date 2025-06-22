import Icn from "@/assets";
import Btn from "@/components/Btn";
import { Line } from "@/components/Line";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";

type Props = {};

const RecipeDetailPage = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuName, recipe, youtube, ingredients } = location.state || {};

  const handleBackToMenus = () => {
    navigate("/recommend-recipe", {
      state: {
        menus: {}, // 이전 메뉴 목록을 다시 가져와야 함
        ingredients: ingredients,
      },
    });
  };

  const handleOpenYoutube = (url: string) => {
    window.open(url, "_blank");
  };

  if (!menuName || !recipe) {
    return (
      <RecipeDetailPageLayout>
        <IcnBackArrowWrapper onClick={() => navigate(-1)}>
          <Icn.IcnBackArrow width={24} height={24} />
        </IcnBackArrowWrapper>
        <ErrorMessage>레시피 정보를 찾을 수 없습니다.</ErrorMessage>
      </RecipeDetailPageLayout>
    );
  }

  return (
    <RecipeDetailPageLayout>
      <IcnBackArrowWrapper onClick={() => navigate(-1)}>
        <Icn.IcnBackArrow width={24} height={24} />
      </IcnBackArrowWrapper>

      <IcnShareWrapper>
        <Icn.IcnShare width={24} height={24} />
      </IcnShareWrapper>

      <Title>{menuName}</Title>
      <Line />

      {/* 재료 목록 */}
      <SectionTitle>필요한 재료</SectionTitle>
      <IngredientsContainer>
        {ingredients?.map((ingredient: string, index: number) => (
          <IngredientTag key={index}>{ingredient}</IngredientTag>
        ))}
      </IngredientsContainer>

      <Line />

      {/* 레시피 단계 */}
      <SectionTitle>조리 방법</SectionTitle>
      <RecipeStepsContainer>
        {recipe.map((step: string, index: number) => (
          <RecipeStep key={index}>
            <StepNumber>{index + 1}</StepNumber>
            <StepText>{step}</StepText>
          </RecipeStep>
        ))}
      </RecipeStepsContainer>

      <Line />

      {/* 유튜브 링크 */}
      {youtube && youtube.length > 0 && (
        <>
          <SectionTitle>관련 영상</SectionTitle>
          <YoutubeContainer>
            {youtube.map((url: string, index: number) => (
              <YoutubeLink key={index} onClick={() => handleOpenYoutube(url)}>
                영상 {index + 1} 보기
              </YoutubeLink>
            ))}
          </YoutubeContainer>
          <Line />
        </>
      )}

      <Btn text="다른 메뉴 보기" onClick={handleBackToMenus} />
    </RecipeDetailPageLayout>
  );
};

export default RecipeDetailPage;

const RecipeDetailPageLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const IcnBackArrowWrapper = styled.div`
  position: absolute;
  top: 30px;
  left: 25px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  cursor: pointer;
  z-index: 10;
`;

const IcnShareWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 25px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  cursor: pointer;
  z-index: 10;
`;

const Title = styled.h1`
  width: 100%;
  padding: 80px 20px 20px 20px;
  text-align: center;
  font-weight: 700;
  font-size: 28px;
  color: ${({ theme }) => theme.color.Gray.gray7};
`;

const SectionTitle = styled.h2`
  margin: 20px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.Gray.gray7};
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 20px;
`;

const IngredientTag = styled.span`
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.color.Green};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const RecipeStepsContainer = styled.div`
  padding: 0 20px;
`;

const RecipeStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: ${({ theme }) => theme.color.Gray.gray1};
  border-radius: 10px;
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.color.Green};
  color: white;
  border-radius: 50%;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;

const StepText = styled.p`
  flex: 1;
  line-height: 1.6;
  font-size: 16px;
  color: ${({ theme }) => theme.color.Gray.gray7};
`;

const YoutubeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
`;

const YoutubeLink = styled.button`
  padding: 15px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cc0000;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: ${({ theme }) => theme.color.Gray.gray6};
`;
