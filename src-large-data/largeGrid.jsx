import React, { useState } from 'react';
import SimpleCellRenderer from './simpleCellRenderer.jsx';
import DropDownCellRenderer from './dropDownCellRenderer.jsx';
import {AgGridReact} from '@ag-grid-community/react';

// for community features
import {AllModules} from "@ag-grid-enterprise/all-modules";

// for enterprise features
// import {AllModules} from "@ag-grid-enterprise/all-modules";

const Grid = () => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [columnDefs, setColumnDefs] = useState(null);
  
    const onGridReady = (params) => {
      setGridApi(params.api);
      setGridColumnApi(params.columnApi);
  
      const httpRequest = new XMLHttpRequest();
      const updateData = (data) => {
        setColumnDefs(createColumnDefs(Object.keys(data[0])));
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

    const createColumnDefs = (columnNames) => {
        const columnDefs = [];

        columnNames.forEach((colName, i) => {
            const columnDef = {
                headerName: colName.toUpperCase(),
                field: colName,
                cellRendererFramework: SimpleCellRenderer,
                width: 100,
                filter: "agTextColumnFilter"
            };

            if(i==2){
                columnDef.pinned = 'right';
                columnDef.cellRendererFramework = DropDownCellRenderer;
            }
            columnDefs.push(columnDef);
        });

        return columnDefs;
    }

    const onbtnClick = ()=>{
        gridApi.exportDataAsExcel();
    }
        return (
            <div style={{height: '100%'}} className="ag-theme-balham">
                <button onClick={onbtnClick}>Download</button>
                <AgGridReact 
                    toolPanel='columns' 
                    onGridReady={onGridReady}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    sideBar={{
                        toolPanels: [
                          {
                            id: 'columns',
                            labelDefault: 'Columns',
                            labelKey: 'columns',
                            iconKey: 'columns',
                            toolPanel: 'agColumnsToolPanel',
                          }
                        ],
                    }}
                    defaultColDef={{
                        flex: 1,
                        minWidth: 100,
                        enableValue: true,
                        enableRowGroup: true,
                        enablePivot: true,
                        sortable: true,
                        filter: true,
                        floatingFilter: true,
                    }}
                    allowContextMenuWithControlKey={true}
                    getContextMenuItems={getContextMenuItems}                    
                    modules={
                        AllModules
                    }
                />
            </div>
        );

}


export default Grid;