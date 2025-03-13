import { ComponentType } from "react";

export type TypeRootStackParamList = {
  post: undefined;
};
export interface IRoute {
  path: keyof TypeRootStackParamList;
  component: ComponentType;
}
