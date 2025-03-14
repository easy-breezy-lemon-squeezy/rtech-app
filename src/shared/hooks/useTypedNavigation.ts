import { useNavigate } from "react-router-dom";
import { TypeRootStackParamList } from "../navigation/navigation.types";

type RouteKeys = keyof TypeRootStackParamList;

export const useTypedNavigation = () => {
  const navigate = useNavigate();

  return (path: RouteKeys, params?: TypeRootStackParamList[RouteKeys]) => {
    let fullPath = path;
    if (params) {
      const queryParams = new URLSearchParams(
        params as Record<string, string>
      ).toString();
      fullPath += `?${queryParams}`;
    }

    navigate("/#/" + fullPath);
  };
};
