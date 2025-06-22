// API 응답 타입 정의

export interface IngredientsResponse {
  ingredients: string[];
}

export interface ErrorResponse {
  code: number;
  message: string;
  result: null;
  success: false;
}

export interface MenusResponse {
  responseMenus: {
    [menuName: string]: string[];
  };
}

export interface RecipeResponse {
  recipe: string[];
  youtube: string[];
}

export type ApiResponse<T> = T | ErrorResponse;
