Ext.Loader.setConfig({
    enabled: true
});

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.selection.CheckboxModel',
    'Ext.util.*',
    'Ext.tip.QuickTipManager',
    'Ext.ux.LiveSearchGridPanel',
    'Ext.ux.data.PagingMemoryProxy'
]);

Ext.onReady(function () {
    Ext.QuickTips.init();

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
        ['American Express Company', 4, 'American Express Company', 52.55, '9/1 12:00am', '9/1 12:00am', 'Finance'],
        ['American International Group, Inc.', 5, 'American International Group, Inc.', 64.13, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['AT&T Inc.', 6, 'AT&T Inc.', 31.61, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['Boeing Co.', 7, 'Boeing Co.', 75.43, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Caterpillar Inc.', 8, 'Caterpillar Inc.', 67.27, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['Citigroup, Inc.', 9, 'Citigroup, Inc.', 49.37, '9/1 12:00am', '9/1 12:00am', 'Finance'],
        ['E.I. du Pont de Nemours and Company', 10, 'E.I. du Pont de Nemours and Company', 40.48, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Exxon Mobil Corp', 11, 'Exxon Mobil Corp', 68.1, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['General Electric Company', 12, 'General Electric Company', 34.14, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['General Motors Corporation', 13, 'General Motors Corporation', 30.27, '9/1 12:00am', '9/1 12:00am', 'Automotive'],
        ['Hewlett-Packard Co.', 14, 'Hewlett-Packard Co.', 36.53, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Honeywell Intl Inc', 15, 'Honeywell Intl Inc', 38.77, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['Intel Corporation', 16, 'Intel Corporation', 19.88, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['International Business Machines', 17, 'International Business Machines', 81.41, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Johnson & Johnson', 18, 'Johnson & Johnson', 64.72, '9/1 12:00am', '9/1 12:00am', 'Medical'],
        ['JP Morgan & Chase & Co', 19, 'JP Morgan & Chase & Co', 45.73, '9/1 12:00am', '9/1 12:00am', 'Finance'],
        ['McDonald\'s Corporation', 20, 'McDonald\'s Corporation', 36.76, '9/1 12:00am', '9/1 12:00am', 'Food'],
        ['Merck & Co., Inc.', 21, 'Merck & Co., Inc.', 40.96, '9/1 12:00am', '9/1 12:00am', 'Medical'],
        ['Microsoft Corporation', 22, 'Microsoft Corporation', 25.84, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Pfizer Inc', 23, 'Pfizer Inc', 27.96, '9/1 12:00am', '9/1 12:00am', 'Medical'],
        ['The Coca-Cola Company', 24, 'The Coca-Cola Company', 45.07, '9/1 12:00am', '9/1 12:00am', 'Food'],
        ['The Home Depot, Inc.', 25, 'The Home Depot, Inc.', 34.64, '9/1 12:00am', '9/1 12:00am', 'Retail'],
        ['The Procter & Gamble Company', 26, 'The Procter & Gamble Company', 61.91, '9/1 12:00am', '9/1 12:00am', 'Manufacturing'],
        ['United Technologies Corporation', 27, 'United Technologies Corporation', 63.26, '9/1 12:00am', '9/1 12:00am', 'Computer'],
        ['Verizon Communications', 28, 'Verizon Communications', 35.57, '9/1 12:00am', '9/1 12:00am', 'Services'],
        ['Wal-Mart Stores, Inc.', 29, 'Wal-Mart Stores, Inc.', 45.45, '9/1 12:00am', '9/1 12:00am', 'Retail'],
        ['Walt Disney Company (The) (Holding Company)', 30, 'Walt Disney Company (The) (Holding Company)', 29.89, '9/1 12:00am', '9/1 12:00am', 'Services']
    ];

    /**
         * Custom function used for column renderer
         * @param {Object} val
         */
    function change(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function pctChange(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }

    var getLocalStore = function () {
        return Ext.create('Ext.data.ArrayStore', {
            model: 'Company',
            data: Ext.grid.dummyData,
            pageSize: 10,
            autoLoad: true,
            // using proxy results in error
            // proxy: {
            //     type: 'pagingmemory',
            //     reader: {
            //         type: 'array'
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
                grid.down('#removeButton').setDisabled(selections.length === 0);
            }
        }
    });
    
    var grid = Ext.create('Ext.ux.LiveSearchGridPanel', {
        id: 'button-grid',
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
            store: getLocalStore(),
            dock: 'bottom',
            displayInfo: true,
            pageSize: 10
        }],

        width: 750,
        height: 500,
        frame: true,
        stripeRows: true,
        title: 'Supports row editing, validation, search and paging',
        iconCls: 'icon-grid',
        renderTo: Ext.getBody()
    });
});
