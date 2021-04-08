import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Pagination } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { linkCellFormatter, DEFAULT_PER_PAGE } from './RolesIndexConstants';

const RolesIndex = ({ rowsData, RolesIndexactions }) => {
  const cols = [
    { title: 'Name' },
    { title: 'Variables', cellTransforms: [linkCellFormatter] },
    { title: 'Hostgroups' },
    { title: 'Hosts', cellTransforms: [linkCellFormatter] },
    { title: 'Imported at' },
  ];
  const [rows, setRows] = useState(rowsData);
  const [page, setPage] = useState();
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [paginatedRows, setPaginatedRows] = useState(rows.slice(0, perPage));

  const handlePerPageSelect = (
      event,
      newPerPage,
      newPage,
      startIdx,
      endIdx
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
    setPaginatedRows(rows.slice(startIdx, endIdx));
  };

  const handleSetPage = (event, newPage) => {
    const startIdx = (newPage - 1) * perPage;
    const endIdx =
        rows.length < newPage * perPage ? rows.length : newPage * perPage;
    setPage(newPage);
    setPaginatedRows(rows.slice(startIdx, endIdx));
  };

  const renderPagination = (variant = 'top') => (
    <Pagination
      isCompact
      itemCount={rows.length}
      page={page}
      perPage={perPage}
      defaultToFullPage
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      perPageOptions={[
        { title: '3', value: 3 },
        { title: '5', value: 5 },
        { title: '10', value: 10 },
      ]}
      titles={{paginationTitle: `${variant} pagination`,}}
    />
  );

  const actions = () => {
    RolesIndexactions(rows)
  };

  return (
    <div id="roles-index-table">
      <Table
        aria-label="roles index"
        rows={paginatedRows}
        actions={actions()}
        cells={cols}
      >
        <TableHeader />
        <TableBody />
      </Table>
      {renderPagination()}
    </div>
  );
};

RolesIndex.defaultProps = {
  rowsData: [],
  RolesIndexactions: undefined,
};

RolesIndex.propTypes = {
  rowsData: PropTypes.array,
  RolesIndexactions: PropTypes.func,
};

export default RolesIndex;
