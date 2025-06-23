import Icn from "@/assets";
import Btn from "@/components/Btn";
import { Line } from "@/components/Line";
import RecipeItem from "@/components/RecipeItem";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { recommendMenus, getRecipe } from "@/apis/axios";
import type { MenusResponse } from "@/apis/types";

const RecommendRecipePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menus, setMenus] = useState<MenusResponse["responseMenus"]>({});
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("recommendedRecipes");
    if (savedData) {
      const { menus, ingredients } = JSON.parse(savedData);
      setMenus(menus);
      setIngredients(ingredients);
    } else if (location.state?.menus) {
      setMenus(location.state.menus);
      setIngredients(location.state.ingredients || []);
    }
  }, [location.state]);

  const handleMenuSelect = (menuName: string) => {
    setSelectedMenu(selectedMenu === menuName ? null : menuName);
  };

  const handleViewRecipe = async () => {
    if (!selectedMenu) {
      alert("메뉴를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await getRecipe(selectedMenu);
      console.log("레시피:", response.recipe);
      navigate("/recipe-detail", {
        state: {
          menuName: selectedMenu,
          recipe: response.recipe,
          youtube: response.youtube,
          ingredients: ingredients,
        },
      });
    } catch (error: any) {
      console.error("API 호출 오류:", error);
      const message =
        error.response?.data?.message || "레시피 조회 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRerollMenus = async () => {
    if (ingredients.length === 0) {
      alert("재료가 없습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await recommendMenus(ingredients);
      setMenus(response.responseMenus);
      setSelectedMenu(null);
      // Save to localStorage
      const recipeData = {
        menus: response.responseMenus,
        ingredients: ingredients,
      };
      localStorage.setItem("recommendedRecipes", JSON.stringify(recipeData));
    } catch (error: any) {
      console.error("API 호출 오류:", error);
      const message =
        error.response?.data?.message || "메뉴 추천 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const menuEntries = Object.entries(menus);

  return (
    <RecommendRecipePageLayout>
      <IcnBackArrowWrapper onClick={() => navigate("/food-detection")}>
        <Icn.IcnBackArrow width={24} height={24} />
      </IcnBackArrowWrapper>

      <HomeButton onClick={() => navigate("/")}>홈으로</HomeButton>

      <Title>레시피 추천 결과</Title>
      <Line />

      {menuEntries.length > 0 ? (
        menuEntries.map(([menuName, requiredIngredients]) => (
          <RecipeItem
            key={menuName}
            ItemName={menuName}
            ItemInfo={`필요 재료: ${requiredIngredients.join(", ")}`}
            checked={selectedMenu === menuName}
            onClick={() => handleMenuSelect(menuName)}
          />
        ))
      ) : (
        <EmptyMessage>추천할 수 있는 메뉴가 없습니다.</EmptyMessage>
      )}

      <DescWrapper>
        <Desc>
          위의 재료로 만들 수 있는 요리는 다음과 같습니다. <br />
          마음에 드는 메뉴를 선택해주세요.
          <br />
          원하는 메뉴가 없으시면 '다시 추천받기' 버튼을 눌러주세요
        </Desc>
      </DescWrapper>

      <Btn
        text={isLoading ? "로딩 중..." : "레시피 상세보기"}
        onClick={handleViewRecipe}
        disabled={!selectedMenu || isLoading}
      />
      <BtnLayout>
        <Button onClick={handleRerollMenus} disabled={isLoading}>
          {isLoading ? "추천 중..." : "다시 추천받기"}
        </Button>
      </BtnLayout>
    </RecommendRecipePageLayout>
  );
};

export default RecommendRecipePage;

const RecommendRecipePageLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const HomeButton = styled.button`
  position: absolute;
  top: 30px;
  right: 25px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.color.Green};
  color: ${({ theme }) => theme.color.Green};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.Green}20;
  }
`;

const IcnShareWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 25px;
  display: flex;
  justify-content: flex-end;

  width: fit-content;
`;

const Title = styled.p`
  width: 100%;
  padding: 30px 0;
  text-align: center;
  font-weight: 600;
  font-size: 26px;
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

const BtnLayout = styled.div`
  width: 100%;
  padding: 0 30px 10px 30px;
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
`;

const EmptyMessage = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.color.Gray.gray6};
  font-size: 14px;
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
