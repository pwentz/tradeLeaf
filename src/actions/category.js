import { createAction } from './createAction';

export const categoryActionTypes = {
  CATEGORY_GET_CATEGORIES: 'CATEGORY_GET_CATEGORIES',
  CATEGORY_GET_CATEGORIES_SUCCESS: 'CATEGORY_GET_CATEGORIES_SUCCESS',
  CATEGORY_GET_CATEGORIES_FAILURE: 'CATEGORY_GET_CATEGORIES_FAILURE',
};

export function createCategoryActions(api) {
  function getCategories() {
    return (dispatch) => {
      dispatch(createAction(categoryActionTypes.CATEGORY_GET_CATEGORIES));
      return api
        .getCategories()
        .then((categories) => {
          dispatch(
            createAction(categoryActionTypes.CATEGORY_GET_CATEGORIES_SUCCESS, { categories })
          );
          return categories;
        })
        .catch((error) => {
          dispatch(createAction(categoryActionTypes.CATEGORY_GET_CATEGORIES_FAILURE, { error }));
          throw error;
        });
    };
  }

  return {
    getCategories,
  };
}
