import React from 'react';

import { useGetProjectApiQuery } from '../../redux/services/ProjectUser';

type ItemDataProjectType = {
  is_archived: number;
};
export function CardMyInternal() {
  const { data: projectAll } = useGetProjectApiQuery('project');
  let arr = [];

  arr.push(projectAll);
  let archived = arr
    .map((item) => item.data)
    .filter((item: ItemDataProjectType) => item.is_archived === 1);
  console.log(`archived`, archived);

  return <></>;
}
