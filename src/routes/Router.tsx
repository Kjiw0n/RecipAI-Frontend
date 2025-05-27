import { BrowserRouter, Route, Routes } from "react-router-dom";

import UploadImagePage from "@/pages/UploadImagePage";
import FoodDetectionPage from "@/pages/FoodDetectionPage";
import RecommendRecipePage from "@/pages/RecommendRecipePage";

type Props = {};

const Router = (props: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadImagePage />} />
        <Route path="/detect" element={<FoodDetectionPage />} />
        <Route path="/recipe" element={<RecommendRecipePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
