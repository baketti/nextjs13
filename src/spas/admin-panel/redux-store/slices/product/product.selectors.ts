import { RootState } from "@/spas/admin-panel/redux-store";

export const getProductsList = (state: RootState) => state?.product?.list ?? [];
