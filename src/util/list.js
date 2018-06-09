import * as R from 'ramda';

export const sortByRecency = R.sortWith([R.descend(R.prop('updatedAt'))]);

export const splitEveryThree = R.splitEvery(3);
