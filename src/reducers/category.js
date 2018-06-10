import { categoryActionTypes } from '../actions/category';

const initialState = {
  categories: [],
};

export default function category(state = initialState, action) {
  switch (action.type) {
    case categoryActionTypes.CATEGORY_GET_CATEGORIES_SUCCESS:
      return Object.assign({}, state, { categories: action.categories });

    default:
      return state;
  }
}
