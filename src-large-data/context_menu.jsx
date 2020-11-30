'use strict';

import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
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

  const getContextMenuItems = (params) => {
    var result = [
      {
        name: 'Alert ' + params.value,
        action: function () {
          window.alert('Alerting about ' + params.value);
        },
        cssClasses: ['redFont', 'bold'],
      },
      {
        name: 'Always Disabled',
        disabled: true,
        tooltip:
          'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!',
      },
      {
        name: 'Country',
        subMenu: [
          {
            name: 'Ireland',
            action: function () {
              console.log('Ireland was pressed');
            },
            icon: createFlagImg('ie'),
          },
          {
            name: 'UK',
            action: function () {
              console.log('UK was pressed');
            },
            icon: createFlagImg('gb'),
          },
          {
            name: 'France',
            action: function () {
              console.log('France was pressed');
            },
            icon: createFlagImg('fr'),
          },
        ],
      },
      {
        name: 'Person',
        subMenu: [
          {
            name: 'Niall',
            action: function () {
              console.log('Niall was pressed');
            },
          },
          {
            name: 'Sean',
            action: function () {
              console.log('Sean was pressed');
            },
          },
          {
            name: 'John',
            action: function () {
              console.log('John was pressed');
            },
          },
          {
            name: 'Alberto',
            action: function () {
              console.log('Alberto was pressed');
            },
          },
          {
            name: 'Tony',
            action: function () {
              console.log('Tony was pressed');
            },
          },
          {
            name: 'Andrew',
            action: function () {
              console.log('Andrew was pressed');
            },
          },
          {
            name: 'Kev',
            action: function () {
              console.log('Kev was pressed');
            },
          },
          {
            name: 'Will',
            action: function () {
              console.log('Will was pressed');
            },
          },
          {
            name: 'Armaan',
            action: function () {
              console.log('Armaan was pressed');
            },
          },
        ],
      },
      'separator',
      {
        name: 'Windows',
        shortcut: 'Alt + W',
        action: function () {
          console.log('Windows Item Selected');
        },
        icon: '<img src="../images/skills/windows.png"/>',
      },
      {
        name: 'Mac',
        shortcut: 'Alt + M',
        action: function () {
          console.log('Mac Item Selected');
        },
        icon: '<img src="../images/skills/mac.png"/>',
      },
      'separator',
      {
        name: 'Checked',
        checked: true,
        action: function () {
          console.log('Checked Selected');
        },
        icon: '<img src="../images/skills/mac.png"/>',
      },
      'copy',
      'separator',
      'chartRange',
    ];
    return result;
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
            MenuModule,
            ExcelExportModule,
            RangeSelectionModule,
            ClipboardModule,
            GridChartsModule,
          ]}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
            resizable: true,
          }}
          enableRangeSelection={true}
          allowContextMenuWithControlKey={true}
          getContextMenuItems={getContextMenuItems}
          onGridReady={onGridReady}
          rowData={rowData}
        >
          <AgGridColumn field="athlete" minWidth={200} />
          <AgGridColumn field="age" />
          <AgGridColumn field="country" minWidth={200} />
          <AgGridColumn field="year" />
          <AgGridColumn field="date" minWidth={180} />
          <AgGridColumn field="sport" minWidth={200} />
          <AgGridColumn field="gold" />
          <AgGridColumn field="silver" />
          <AgGridColumn field="bronze" />
          <AgGridColumn field="total" />
        </AgGridReact>
      </div>
    </div>
  );
};

function createFlagImg(flag) {
  return (
    '<img border="0" width="15" height="10" src="https://flags.fmcdn.net/data/flags/mini/' +
    flag +
    '.png"/>'
  );
}

export default GridExample;