/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

funciones = {
    
    
    allowUnmask:function(){
        if(Ext.getCmp('containerGrid0').isVisible()){
            Ext.getCmp('grdCatalogos0').el.unmask();
        }
    },
    saveDispositivosAsignacion:function(){
        var dispositivosArr=[];
        Ext.getCmp('grpAsignados_dispositivoGrids').store.each(function(record){
            dispositivosArr.push(record.data);
        });
        Ext.Ajax.request({
            url : '../DispositivosStore.x' ,
            params:{
                cascada: 'asignaDispositivosEstaciones',
                cve_base_estacion: Ext.getCmp('cmbBasesEstaciones1').getValue(),
                dispositivosArr: Ext.encode(dispositivosArr)
            },
            timeout: 60000,
            method: 'POST',
            success: function(result, request){
                Ext.Msg.show({
                title: 'App 4 Videx',
                msg:  Ext.util.JSON.decode(result.responseText),
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK,
                fn: function(btn, text) {
                    if (btn === 'ok') {
                    } else {
                    }
                }
            });
            },
            failure: function(result, request){
                Ext.Msg.show({
                title: 'App 4 Videx',
                msg: Ext.util.JSON.decode(result.responseText),
                
                icon: Ext.MessageBox.INFO,
                buttons: Ext.Msg.OK,
                fn: function(btn, text) {
                    if (btn === 'ok') {
                    } else {
                    }
                }
            });
            },
            callback: function(){
            }
        });
    }
}