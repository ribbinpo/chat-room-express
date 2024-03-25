import { compilerOptions } from "./tsconfig.json";
import { pathsToModuleNameMapper } from "ts-jest";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
