Ext.Loader.setConfig({
    enabled: true
});

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.selection.CheckboxModel'
]);

Ext.onReady(function () {
    Ext.define('Company', {
        extend: 'Ext.data.Model',
        fields: [
            { name: 'company' },
            { name: 'id', type: 'float' },
            { name: 'name' },
            { name: 'price', type: 'float' },
            { name: 'dateCreated', type: 'date', dateFormat: 'n/j h:ia' },
            { name: 'onlineDate', type: 'date', dateFormat: 'n/j h:ia' },
            { name: 'userCreated' },
            { name: 'desc' }
        ]
    });
    // Array data for the grids
    Ext.grid.dummyData = [
        ['3m Co', 1, '3m Co', 71.72, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Alcoa Inc', 2, 'Alcoa Inc', 29.01, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Altria Group Inc', 3, 'Altria Group Inc', 83.81, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['American Express Company', 4, 52.55, '9/1 12:00am', '9/1 12:00am', 'Finance'],
        ['American International Group, Inc.', 5, 64.13, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['AT&T Inc.', 6, 31.61, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['Boeing Co.', 7, 75.43, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Caterpillar Inc.', 8, 67.27, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['Citigroup, Inc.', 9, 49.37, '9/1 12:00am', '9/1 12:00am', 'Finance'],
        ['E.I. du Pont de Nemours and Company', 10, 40.48, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Exxon Mobil Corp', 11, 68.1, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['General Electric Company', 12, 34.14, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['General Motors Corporation', 13, 30.27, '9/1 12:00am', '9/1 12:00am', 'Automotive'],
        ['Hewlett-Packard Co.', 14, 36.53, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Honeywell Intl Inc', 15, 38.77, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Intel Corporation', 16, 19.88, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['International Business Machines', 17, 81.41, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Johnson & Johnson', 18, 64.72, '9/1 12:00am', '9/1 12:00am', 'Medical'],
        ['JP Morgan & Chase & Co', 19, 45.73, '9/1 12:00am', '9/1 12:00am', 'Finance'],
        ['McDonald\'s Corporation', 20, 36.76, '9/1 12:00am', '9/1 12:00am', 'Food'],
        ['Merck & Co., Inc.', 21, 40.96, '9/1 12:00am', '9/1 12:00am', 'Medical'],
        ['Microsoft Corporation', 22, 25.84, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Pfizer Inc', 23, 27.96, '9/1 12:00am', '9/1 12:00am', 'Medical'],
        ['The Coca-Cola Company', 24, 45.07, '9/1 12:00am', '9/1 12:00am', 'Food'],
        ['The Home Depot, Inc.', 25, 34.64, '9/1 12:00am', '9/1 12:00am', 'Retail'],
        ['The Procter & Gamble Company', 26, 61.91, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['United Technologies Corporation', 27, 63.26, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Verizon Communications', 28, 35.57, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['Wal-Mart Stores, Inc.', 29, 45.45, '9/1 12:00am', '9/1 12:00am', 'Retail'],
        ['Walt Disney Company (The) (Holding Company)', 30, 29.89, '9/1 12:00am', '9/1 12:00am', 'Services']
    ];

    // add in some dummy descriptions
    for (var i = 0; i < Ext.grid.dummyData.length; i++) {
        Ext.grid.dummyData[i].push('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. ');
    }


    //Ext.QuickTips.init();

    var getLocalStore = function () {
        return Ext.create('Ext.data.ArrayStore', {
            model: 'Company',
            data: Ext.grid.dummyData,
            pageSize: 10,
            // proxy: {
            //     type: 'ajax',
            //     url: 'data/users.json',
            //     reader: {
            //         type: 'json',
            //         rootProperty: 'users',
            //         totalProperty: 'total'
            //     }
            // }
        });
    };

    ////////////////////////////////////////////////////////////////////////////////////////
    // Grid
    ////////////////////////////////////////////////////////////////////////////////////////
    var selModel = Ext.create('Ext.selection.CheckboxModel', {
        listeners: {
            selectionchange: function (sm, selections) {
                grid4.down('#removeButton').setDisabled(selections.length === 0);
            }
        }
    });
    
    // var test = Ext.Date.format(new Date(), "m/d/Y");
    //     alert(test);
    var grid4 = Ext.create('Ext.grid.Panel', {
        // id: 'button-grid',
        store: getLocalStore(),
        plugins: [{
            ptype: 'rowediting',
            clicksToEdit: 1
        }],
        columns: [
            { text: "Id", sortable: true, editable: true, dataIndex: 'id' },
            { text: "product name", width: 120, sortable: true,  editable: true, dataIndex: 'name' ,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
            { text: "product price", width: 120, sortable: true,  editable: true, dataIndex: 'price', 
                renderer: Ext.util.Format.usMoney,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0
                }
            },
            { text: "date created", width: 120, sortable: true,  editable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'dateCreated' },
            {
                text: "online date", width: 120, sortable: true, editable: true, dataIndex: 'onlineDate',
                renderer: Ext.util.Format.dateRenderer('m/d/Y'), 
                editor: {
                    xtype: 'datefield',
                    allowBlank: false,
                    minValue: Ext.Date.format(new Date(), "m/d/Y")
                }
             },
            { text: "user created", width: 120, sortable: true,  editable: true, dataIndex: 'userCreated' }
        ],

        dockedItems: [{
            xtype: 'pagingtoolbar',
            store: getLocalStore(),   // same store GridPanel is using
            dock: 'bottom',
            displayInfo: true
        }],

        width: 800,
        height: 300,
        frame: true,
        title: 'Support for standard Panel features such as framing, buttons and toolbars',
        iconCls: 'icon-grid',
        renderTo: Ext.getBody()
    });
});
