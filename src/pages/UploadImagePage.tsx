import { analyzeIngredients } from "@/apis/axios";
import Icn from "@/assets";
import backImg from "@/assets/back.png";
import Btn from "@/components/Btn";
import LoadingIndicator from "@/components/LoadingIndicator";
import styled from "@emotion/styled";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const UploadImagePage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 검증 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }

      setSelectedImage(file);

      // 미리보기 URL 생성
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("이미지를 선택해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await analyzeIngredients(selectedImage);
      console.log("분석된 재료:", response.ingredients);
      navigate("/food-detection", {
        state: {
          ingredients: response.ingredients,
          imageFile: selectedImage,
        },
      });
    } catch (error: any) {
      console.error("API 호출 오류:", error);
      const message =
        error.response?.data?.message || "이미지 분석 중 오류가 발생했습니다.";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <UploadImagePageLayout>
      {isLoading && <LoadingIndicator message="이미지를 분석하고 있어요..." />}
      <TopContainer>
        <ImageContainer onClick={handleImageClick}>
          {previewUrl ? (
            <PreviewImage src={previewUrl} alt="선택된 이미지" />
          ) : (
            <>
              <Icn.SampleImg width={200} height={200} />
              <ClickIconWrapper>
                <Icn.IcnClick width={40} height={40} />
              </ClickIconWrapper>
            </>
          )}
        </ImageContainer>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{ display: "none" }}
        />

        <TextContainer>
          <Title>Upload your Image</Title>
          <Desc>
            사용하고자 하는 음식 재료 사진을 업로드 해주세요. <br />
            사진 용량은 최대 10MB입니다. <br />
            <br />
            정확한 인식을 위해 용기에 담겨있거나, <br />
            원래의 모습을 알아보기 힘든 재료(ex. 심하게 변색된 재료)는 <br />
            인식이 어려울 수 있습니다.
          </Desc>
        </TextContainer>
      </TopContainer>

      <Btn
        text="Upload"
        onClick={handleUpload}
        disabled={!selectedImage || isLoading}
      />
    </UploadImagePageLayout>
  );
};

export default UploadImagePage;

const UploadImagePageLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 100vh;

  background-image: url(${backImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin-top: 100px;

  gap: 50px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 15px;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 26px;
`;

const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.color.Gray.gray7};
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ClickIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  animation: bounce 1.5s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;
