import { Address, Gif, SectionTypes, Txn, Text } from "../Blockbook"


export const BLOCBOOK_TAG = '@blocbook'
export const prependBlockbookTag = (text: string) => {
  return `${BLOCBOOK_TAG} ${text}`
}

export const unpendBlockbookTag = (text: string) => {
  return text.substring(10, text.length)
}

const TXN_CAST_TAG = 'Looking at transaction : '
export const isCastTXN = (cast: string) => cast.substring(0, 25) === TXN_CAST_TAG
export const createCastTXN = (cast: string) =>
  `${TXN_CAST_TAG}${cast}`

const ADDR_CAST_TAG = 'Looking at address : '
export const isCastADDR = (cast: string) => cast.substring(0, 21) === ADDR_CAST_TAG 
export const createCastADDR = (cast: string) =>
  `${ADDR_CAST_TAG}${cast}`


export const appendCastCounter = (cast: string, total: number, count: number) =>
  `${cast} [${count}/${total}]`

export const unpendCastCounter = (cast: string) => {

  const endingBrace = cast.endsWith(']')

  if (!endingBrace) {
    return cast
  }

  const startingBrace = cast.indexOf(" [")

  if (startingBrace == -1) {
    return cast
  }

  return cast.substring(0, startingBrace)
}


export const getSectionType = (cast: string) => {
  if (isCastTXN(cast)) {
    return SectionTypes.TXN
  } else if (isCastADDR(cast)) {
    return SectionTypes.ADDRESS
  } else {
    return SectionTypes.TEXT
  }
}

export const createSectionData = (cast: string): Txn | Address | Text | Gif | undefined => {
  let castWithNoTags = cast.includes(BLOCBOOK_TAG) ? unpendBlockbookTag(cast) : cast
  castWithNoTags = unpendCastCounter(castWithNoTags)
  const sectionType = getSectionType(castWithNoTags)

  switch (sectionType){

    case SectionTypes.ADDRESS:
      return {
        address: castWithNoTags
      }

    case SectionTypes.TXN:
      return {
        address: castWithNoTags
      }

    case SectionTypes.TEXT:
      return {
        text: castWithNoTags
      }

    default: 
      break; 
  }

  return undefined 
}

