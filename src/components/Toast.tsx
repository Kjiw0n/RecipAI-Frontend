import styled from "@emotion/styled";
import { useEffect } from "react";

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
};

const Toast = ({ message, duration = 2000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <ToastContainer>
      <ToastMessage>{message}</ToastMessage>
    </ToastContainer>
  );
};

export default Toast;

const ToastContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  text-align: center;
  animation: fadeInOut 2s ease-in-out;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    10% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    90% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
  }
`;

const ToastMessage = styled.p`
  margin: 0;
`;
