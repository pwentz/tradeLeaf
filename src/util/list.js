import * as R from 'ramda';

export const sortByRecency = R.sortWith([R.descend(R.prop('updatedAt'))]);
