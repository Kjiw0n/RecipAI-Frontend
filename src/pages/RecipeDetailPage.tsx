import Icn from "@/assets";
import Btn from "@/components/Btn";
import { Line } from "@/components/Line";
import Toast from "@/components/Toast";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RecipeDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuName, recipe, youtube, ingredients } = location.state || {};
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

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

  const handleShare = async () => {
    const shareData = {
      title: `RecipAI - ${menuName} 레시피`,
      text: `${menuName} 레시피를 확인해보세요!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        triggerToast("레시피가 성공적으로 공유되었습니다!");
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        triggerToast("레시피 링크가 클립보드에 복사되었습니다.");
      }
    } catch (error) {
      console.error("Share failed:", error);
      triggerToast("공유에 실패했습니다.");
    }
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
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
      <IcnBackArrowWrapper onClick={() => navigate("/recommend-recipe")}>
        <Icn.IcnHome width={24} height={24} />
      </IcnBackArrowWrapper>

      <IcnShareWrapper onClick={handleShare}>
        <Icn.IcnShare width={24} height={24} />
      </IcnShareWrapper>

      <TitleWrapper>
        <Title>{menuName}</Title>
      </TitleWrapper>
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
  width: fit-content;
  cursor: pointer;
  z-index: 10;
`;

const IcnShareWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 25px;
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  cursor: pointer;
  z-index: 10;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
  padding: 10px 20px;
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
  word-break: keep-all;
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
