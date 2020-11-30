'use strict';

import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      setRowData(data);
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          modules={[
            ClientSideRowModelModule,
            SetFilterModule,
            MenuModule,
            ColumnsToolPanelModule,
          ]}
          defaultColDef={{
            flex: 1,
            minWidth: 200,
            resizable: true,
            floatingFilter: true,
          }}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" filter="agSetColumnFilter" />
          <AgGridColumn field="country" filter="agSetColumnFilter" />
          <AgGridColumn field="gold" filter="agNumberColumnFilter" />
          <AgGridColumn field="silver" filter="agNumberColumnFilter" />
          <AgGridColumn field="bronze" filter="agNumberColumnFilter" />
        </AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;