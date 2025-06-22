import instance from "./instance";
import type {
  IngredientsResponse,
  MenusResponse,
  RecipeResponse,
} from "./types";

// 1. 이미지 속 식재료 분석 API
export const analyzeIngredients = async (
  imageFile: File
): Promise<IngredientsResponse> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const { data } = await instance.post<IngredientsResponse>(
    "/chat/ingredients",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

// 2. 재료 목록으로 메뉴 추천 API
export const recommendMenus = async (
  ingredients: string[]
): Promise<MenusResponse> => {
  const { data } = await instance.post<MenusResponse>(
    "/chat/menus",
    ingredients
  );
  return data;
};

// 3. 선택한 메뉴의 레시피 제공 API
export const getRecipe = async (menuName: string): Promise<RecipeResponse> => {
  const { data } = await instance.post<RecipeResponse>(
    "/chat/recipe",
    menuName,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  return data;
};
