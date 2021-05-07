/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */





formElement = {
    /**
     *     <div style="height:120px;width:250px;overflow:scroll;">
     * funcion para obtener un combo generico.
     * @author   CVER.
     * @param {String} hisId.
     * @param {String} hisName. 
     * @param {Array[] &nbsp; or&nbsp; String} arrayOrValueToDisplay. 
     * @param {JsonStore} hisStore. 
     * @param {Integer} hisWidth. 
     * @param {Integer} hisListWidth. 
     * @param {Function} selectTo.
     * @param {Function} blurTo. 
     * @param {Boolean} trigger.
     * @return {Ext.form.ComboBox} regresa un combo con los atributos usualmente utilizados incluyendo sus eventos select y blur.
     *</div> 
     * {formElement.genericCombo('cmbPeriodo0','cvePeriodo',mx.com.lobos.admpag.destajo.rhdesf14.jsonStores.consultaPeriodoCmb(),mx.com.lobos.admpag.destajo.rhdesf14.arrayIdsDisplay)}
     *  trickDragAndDrop(
     <br>
     'hisId', //El id que se desea dar al combo (opcional)
     <br/>
     <br>
     'hisName', // Nombre que se le quiere dar al combo y se utiliza tambi&eacute;n para el valueField y displayField
     <br/>
     <br>
     'hisStore', // jsonStore que utilizar&aacute; el combo- opcional ya que le asigna un JsonStore vacio de no enviarle uno pre definido
     <br/>
     <br>
     'arrayOrValueToDisplay', //Arreglo o cadena de caracteres con los valores del recordfield que se desean desplegar en la lista del combo
     <br/>
     <br>
     'selectTo' //funci&oacute;n que se ejecuta en el evento (select) del combo- opcional
     <br/>
     <br>
     'blurTo' //Funci&oacute;n que se ejecuta en el evento (blur) del combo-opcional
     <br/>
     <br>
     'hisWidth' //Tama"&ntilde;o que se le desea dar al combo y a la lista del grid- opcional si no se asigna el combo sera autoWidth
     <br/>
     <br>
     'trigger' // Para mostrar u ocultar el trigger del combo (default false)-opcional
     <br/>
     *  <br/> 
     */
    genericComboBox: function (hisValue, hisId, hisName, arrayOrValueToDisplay, hisStore, hisWidth, hisListWidth, selectTo, blurTo, trigger, keyPress) {
        hisValue = Ext.value(hisValue, '');
        hisId = Ext.value(hisId, '');
        hisName = Ext.value(hisName, '');
        trigger = Ext.value(trigger, false);
        hisStore = Ext.value(hisStore, new Ext.data.JsonStore());
        hisListWidth = Ext.value(hisListWidth, hisWidth);
        arrayOrValueToDisplay = Ext.value(arrayOrValueToDisplay, '');
        var toDisplay = "",
                condition = "",
                setBool = false,
                opcion = false;
        setBool = (Ext.isEmpty(hisWidth)) ? true : false;
        opcion = (Ext.isIE) ? true : false;
        switch (opcion) {
            case true:
                condition = typeof arrayOrValueToDisplay !== "string";
                break;
            case false:
                condition = Array.isArray(arrayOrValueToDisplay);
                break;
        }
        if (condition) {
            for (var n = 0; n < arrayOrValueToDisplay.length; n++) {
                if (!Ext.isEmpty(arrayOrValueToDisplay[n])) {
                    toDisplay += '{' + arrayOrValueToDisplay[n] + '}-';
                }
            }
            if (!Ext.isEmpty(arrayOrValueToDisplay)) {
                toDisplay = toDisplay.substring(0, toDisplay.length - 1);
            }
        } else if (arrayOrValueToDisplay.length > 0) {
            toDisplay = '{' + arrayOrValueToDisplay + '}';
        } else if (arrayOrValueToDisplay === '') {
            toDisplay = '{}';
        }
        var cmb = new Ext.form.ComboBox({
            id: hisId,
            name: hisName,
            displayField: hisName,
            valueField: hisName,
            autoWidth: setBool,
            listWidth: hisListWidth,
            hideTrigger: trigger,
            store: hisStore,
            triggerAction: 'all',
            mode: 'local',
            tpl: '<tpl for="."><div class="x-combo-list-item">' + toDisplay + '</div></tpl>',
            style: {textTransform: "uppercase"},
            editable: true,
            autocomplete: false,
            selectOnFocus: true,
            typeAhead: true,
            forceSelection: true,
            lazyRender: true,
            enableKeyEvents: true,
//            value: '1',

            listeners: {
                select: function (a, record) {
                    Ext.getCmp('principalForm').getForm().reset();
//                    tipoOperacion = record.data.identifier;
                    try {
                        if (record.data.identifier === '1') {
                            valor1 = Ext.getCmp('numbSuma1').getValue();
                            valor2 = Ext.getCmp('numbSuma2').getValue();
                            Ext.getCmp('fielsetSum').setVisible(true);
                            Ext.getCmp('fielsetPower').setVisible(false);
                            Ext.getCmp('fielsetProduct').setVisible(false);
                        } else if (record.data.identifier === '2') {
                            valor1 = Ext.getCmp('numbMultiplicacion').getValue();
                            Ext.getCmp('fielsetProduct').setVisible(true);
                            Ext.getCmp('fielsetSum').setVisible(false);
                            Ext.getCmp('fielsetPower').setVisible(false);
                        } else if (record.data.identifier === '3') {
                            valor1 = Ext.getCmp('numbPotencia').getValue();
                            Ext.getCmp('fielsetPower').setVisible(true);
                            Ext.getCmp('fielsetSum').setVisible(false);
                            Ext.getCmp('fielsetProduct').setVisible(false);
                        }

                    } catch (e) {

                    }

                },
                blur: function () {
                    try {
                        if (Ext.isEmpty(this.getValue()) && blurTo !== undefined) {
                            blurTo();
                        }
                    } catch (e) {
//                            
                    }
                },
                keypress: function (e) {
                    try {
                        if (!Ext.isEmpty(this.getValue()) && keyPress !== undefined) {
                            var key = e.getKey();
                            if (key === e.ENTER) {
                                keyPress(e);
                            }
                        }
                    } catch (e) {

                    }
                },
                afterrender: function (combo) {
                    var recordSelected = combo.getStore().getAt(0);
                    combo.setValue(recordSelected.get('descripcion'));
                }
            }
        });
        if (hisWidth !== true) {
            Ext.getCmp(hisId).setWidth(hisWidth);
        }
        return cmb;
    }
    


};