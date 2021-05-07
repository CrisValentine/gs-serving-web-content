/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

funcionesLocales = {
    
tiposDatos : function () {
    
    var finalValue;
    var valor1;
    var valor2;
    var option;
    if (Ext.getCmp('cmbOptions').getValue() === 'Suma') {
        finalValue = "";
        option = 1;
        valor1 = Ext.getCmp('numbSuma1').getValue();
        valor2 = Ext.getCmp('numbSuma2').getValue();
        finalValue = valor1+'/'+valor2;
        return option+'/'+finalValue;
    } else if (Ext.getCmp('cmbOptions').getValue()=== 'Multiplica') {
        finalValue = "";
        option = 2;
        valor2 = 0
        valor1 = Ext.getCmp('numbMultiplicacion').getValue();
        finalValue = valor1+'/'+valor2;
        return option+'/'+finalValue;
    } else if (Ext.getCmp('cmbOptions').getValue() === 'Exponencia') {
        finalValue = "";
        option = 3;
        valor2 = 0
        valor1 = Ext.getCmp('numbPotencia').getValue();
        finalValue = valor1+'/'+valor2;
        return option+'/'+finalValue;
    }
    
},
    saveDispositivosAsignacion: function () {
//        var dispositivosArr=[];
//        Ext.getCmp('grpAsignados_dispositivoGrids').store.each(function(record){
//            dispositivosArr.push(record.data);
//        });
        Ext.Ajax.request({
            url: 'http://localhost:9898/api/v1/tipoOperacion/'+this.tiposDatos(),
            params: {
                type: 'rest',
                headers: {'Accept': 'application/json'},
                fiTipoDeAccion: '1',
                numero1: '1',
                numero2: '2'
            },
            cors: true,
            timeout: 60000,
            method: 'POST',
            success: function (result, request) {
                Ext.Msg.show({
                    title: 'App 4 Videx',
                    msg: result.responseText,
                    icon: Ext.MessageBox.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function (btn, text) {
                        if (btn === 'ok') {
                            Ext.getCmp('textAreaResultado').setValue(result.responseText)
                        } else {
                        }
                    }
                });
            },
            failure: function (result, request) {
                Ext.Msg.show({
                    title: 'App 4 Videx',
                    msg: result.responseText,
                    icon: Ext.MessageBox.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function (btn, text) {
                        if (btn === 'ok') {
                            Ext.getCmp('textAreaResultado').setValue(result.responseText)
                        } else {
                        }
                    }
                });
            },
            callback: function () {
                
            }
        });
    }
}

fieldsetProperties = {
    changeHandler: function () {
        if (Ext.getCmp('cmbOptions').getValue() === 'Suma' && !Ext.isEmpty(Ext.getCmp('numbSuma1').getValue()) && !Ext.isEmpty(Ext.getCmp('numbSuma2').getValue())) {
            funcionesLocales.saveDispositivosAsignacion();
        } else if (Ext.getCmp('cmbOptions').getValue() === 'Multiplica' && (!Ext.isEmpty(Ext.getCmp('numbMultiplicacion').getValue()))) {
            funcionesLocales.saveDispositivosAsignacion();
        } else if (Ext.getCmp('cmbOptions').getValue() === 'Exponencia' && (!Ext.isEmpty(Ext.getCmp('numbPotencia').getValue()))) {
            funcionesLocales.saveDispositivosAsignacion();
        } else {
            Ext.Msg.show({
                title: 'App operaciones',
                msg: "Favor de llenar los campos correspondientes",
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK,
                fn: function (btn, text) {
                    if (btn === 'ok') {
                    } else {
                    }
                }
            });
        }
    }
}

generalForm = new Ext.FormPanel({
    labelWidth: 75,
    id: 'principalForm',
    url: 'save-form.php',
    frame: true,
    title: 'Simple Form',
    bodyStyle: 'padding:5px 5px 0',
    width: 350,
    defaults: {width: 230},
    defaultType: 'textfield',

    items: [
        
        
        {
            xtype: 'fieldset',
            id: 'fielsetSum',
            columnWidth: 0.5,
            title: 'Suma',
            hidden: false,
            collapsible: false,
            autoHeight: true,
            defaults: {
                anchor: '-20' // leave room for error icon
            },
            defaultType: 'numberfield',
            items: [{
                    fieldLabel: 'Primer n\u00famero',
                    allowBlank: false,
                    id: 'numbSuma1'
                }, {
                    fieldLabel: 'Segundo n\u00famero',
                    allowBlank: false,
                    id: 'numbSuma2'
                }
            ]
        },
        {
            // Fieldset in Column 1
            xtype: 'fieldset',
            id: 'fielsetProduct',
//            columnWidth: ,
            title: 'Multiplicaci\u00f3n',
            hidden: true,
            collapsible: false,
            autoHeight: true,
            defaults: {
                anchor: '-20' // leave room for error icon
            },
            defaultType: 'numberfield',
            items: [{
                    fieldLabel: 'N\u00famero para multiplicar',
                    allowBlank: false,
                    id: 'numbMultiplicacion'
                }
            ]
        },
        {
            xtype: 'fieldset',
            id: 'fielsetPower',
            columnWidth: 0.5,
            title: 'Exponencial',
            hidden: true,
            collapsible: false,
            autoHeight: true,
            defaults: {
                anchor: '-20' // leave room for error icon
            },
            defaultType: 'numberfield',
            items: [{
                    fieldLabel: 'N\u00famero para exponenciar',
                    allowBlank: false,
                    id: 'numbPotencia'
                }
            ]
        },
        {
          xtype:'label',
          text:'Operaciones guardadas:'
        },
        
        {
            xtype: 'textarea',
            id: 'textAreaResultado',
            width: 500,
            height: 500
            
        }



    ],

    tbar: [
        {
            xtype: 'button',
            text: 'Guardar',
            style: {
                border: '1px black solid'
            },
            handler: function () {
                fieldsetProperties.changeHandler();

            }
        }, '-',
        {
            xtype: 'button',
            text: 'Limpiar',
            style: {
                border: '1px black solid'
            },
            handler: function () {
                Ext.getCmp('principalForm').getForm().reset();

            }
        }, '->',
        formElement.genericComboBox('1', 'cmbOptions',
                'descripcion',
                arr = ['identifier', 'descripcion'],
                new Ext.data.ArrayStore({fields: arr, data: [['1', 'Suma'], ['2', 'Multiplica'], ['3', 'Exponencia']]}), 200, 'descripcion'
                )
    ]
})