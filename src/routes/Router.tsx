import { BrowserRouter, Route, Routes } from "react-router-dom";

import UploadImagePage from "@/pages/UploadImagePage";
import FoodDetectionPage from "@/pages/FoodDetectionPage";
import RecommendRecipePage from "@/pages/RecommendRecipePage";
import RecipeDetailPage from "@/pages/RecipeDetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadImagePage />} />
        <Route path="/upload" element={<UploadImagePage />} />
        <Route path="/food-detection" element={<FoodDetectionPage />} />
        <Route path="/recommend-recipe" element={<RecommendRecipePage />} />
        <Route path="/recipe-detail" element={<RecipeDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
