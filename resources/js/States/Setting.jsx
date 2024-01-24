import { atom } from "recoil";
import { paging } from "./Common";
import { itemMarginNewObject } from "./ItemMargin";

export const settingNewObject = {
    id: 0,
    name: '',
    string_value: '',
    integer_value: 0,
    boolean_value: false,
    date_time_value: null,
    decimal_value: 0.00,
    is_active: false
};

export const settingItemPriceAsMasterItemNewObject = settingNewObject;
export const settingItemMarginAsMasterItemNewObject = settingNewObject;
export const settingItemCOGSNewObject = settingNewObject;
export const settingMarginTypeNewObject = {
    ...settingNewObject,
    item_margin: itemMarginNewObject
};
export const settingItemPriceMarginFlatNewObject = settingNewObject;
export const settingItemPriceMarginPercentNewObject = settingNewObject;

export const settingListNewObject = [];

export const settingListState = atom({
    key: 'settingListState',
    default: []
});

export const settingState = atom({
    key: 'settingState',
    default: settingNewObject,
});

export const settingItemPriceAsMasterItemState = atom({
    key: 'settingItemPriceAsMasterItemState',
    default: settingItemPriceAsMasterItemNewObject,
});

export const settingItemMarginAsMasterItemState = atom({
    key: 'settingItemMarginAsMasterItemState',
    default: settingItemMarginAsMasterItemNewObject,
});

export const settingItemCOGSState = atom({
    key: 'settingItemCOGSState',
    default: settingItemCOGSNewObject,
});

export const settingMarginTypeState = atom({
    key: 'settingMarginTypeState',
    default: settingMarginTypeNewObject,
});

export const settingItemPriceMarginFlatState = atom({
    key: 'settingItemPriceMarginFlatState',
    default: settingItemPriceMarginFlatNewObject,
});

export const settingItemPriceMarginPercentState = atom({
    key: 'settingItemPriceMarginPercentState',
    default: settingItemPriceMarginPercentNewObject,
});

