/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


GENERAL_TAB_CONTAINER = Ext.extend(Ext.TabPanel, {
    id: 'generalContainer0',
    activeTab   : 0,
    autoWidth: true,
    height: 550,
    autoScroll:true,
    frame: true,
    initComponent: function() {
        this.items = [
            
            generalForm
        ];
        GENERAL_TAB_CONTAINER.superclass.initComponent.call(this);
    }
});
GENERAL_TAB_CONTAINER_FORM = Ext.extend(GENERAL_TAB_CONTAINER, {
    initComponent: function() {
        GENERAL_TAB_CONTAINER_FORM.superclass.initComponent.call(this);
    }
});
Ext.onReady(function() {
    Ext.QuickTips.init();
    var cmp1 = new GENERAL_TAB_CONTAINER_FORM({
        renderTo: Ext.getBody(),
        listeners:{
            show: function(component){
            }
        }
    });
    cmp1.show();
    Ext.getCmp('generalContainer0').setSize();
});

