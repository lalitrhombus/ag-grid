'use strict';

import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
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
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
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
            RowGroupingModule,
            MenuModule,
            SetFilterModule,
            ColumnsToolPanelModule,
          ]}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            enableValue: true,
            enableRowGroup: true,
            enablePivot: true,
            sortable: true,
            filter: true,
          }}
          sideBar={'columns'}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn headerName="Athlete">
            <AgGridColumn
              field="athlete"
              filter="agTextColumnFilter"
              minWidth={200}
            />
            <AgGridColumn field="age" />
            <AgGridColumn field="country" minWidth={200} />
          </AgGridColumn>
          <AgGridColumn headerName="Competition">
            <AgGridColumn field="year" />
            <AgGridColumn field="date" minWidth={180} />
          </AgGridColumn>
          <AgGridColumn field="sport" minWidth={200} />
          <AgGridColumn headerName="Medals">
            <AgGridColumn field="gold" />
            <AgGridColumn field="silver" />
            <AgGridColumn field="bronze" />
            <AgGridColumn field="total" />
          </AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};


export default GridExample;