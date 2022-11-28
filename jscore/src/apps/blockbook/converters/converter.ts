
import { appendCastCounter, createCastADDR, createCastTXN, createSectionData, getSectionType, prependBlockbookTag } from "./preAlpha";

export enum BlocbookEnv {
  PRE_ALPHA,
  ALPHA,
  BETA,
}

export const getFarcasterDataConverter = () => {
  return {
    appendCastCounter,
    prependBlockbookTag,
    createCastADDR,
    createCastTXN,
    createSectionData,
    getSectionType,
  }
}

