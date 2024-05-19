import { sharedConfigRoutes } from "../../../shared/config";
const { RouteName } = sharedConfigRoutes;
interface GetBinPageUrlParams {
    folderId: number;
}
export const getBinPageUrl = ({ folderId }: GetBinPageUrlParams): string =>
    RouteName.BINARY.replace(':folderId', folderId.toString());