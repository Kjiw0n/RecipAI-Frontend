import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(5px);
`;

const Spinner = styled.div`
  border: 6px solid ${({ theme }) => theme.color.Gray.gray2};
  border-top: 6px solid ${({ theme }) => theme.color.Green};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1.2s linear infinite;
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 24px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

type LoadingIndicatorProps = {
  message?: string;
};

const LoadingIndicator = ({
  message = "잠시만 기다려 주세요...",
}: LoadingIndicatorProps) => {
  return (
    <LoadingOverlay>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingOverlay>
  );
};

export default LoadingIndicator;
