import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import RolesIndex from './RolesIndex';
import { onDelete } from "./RolesIndexActions";
const WrappedRolesIndex = props => {

  const dispatch = useDispatch();
  const actions = (rows) => [
    {
      title: 'Delete',
      onClick: (event, rowId, rowData, extra) => {
        event.preventDefault();
        dispatch(onDelete(rows[rowId].role));
      },
    },
  ];

  return (
    <RolesIndex
      RolesIndexactions = {actions}
      {...props}
    />
  );
};

export default WrappedRolesIndex;
