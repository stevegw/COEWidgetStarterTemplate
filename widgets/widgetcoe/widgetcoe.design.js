// This widget definition will get combined into combined-widgets.js file along with all other widget definitions
// use of anonymous func ensures nothing here leaks into global scope



  // If you copy this extension to create your own extension as a starter be very careful with the naming structure
  // The are some case senitivity issues I have not fully understood I follow
  // Dont use copy past replace all. 
  // For example if you are creating a new widget called amazingar
  // Do a search for twxWidgetcoe and replace with  twxAmazingar
  // Do a search for twx-widgetcoe and replace with twx-amazingar
  // Use the approach in -ng.js too
  //
  // When making chnages to either the design or ng files you will need to stop and start the Vuforia Studio service
  // Changes to your implemenation file in this case called widgetcoe.js you only need to start preview again

(function() {
  function twxWidgetcoe() {
    return {
      // Required, this will be used as the top level tag when it's dropped on the Canvas
      // use a custom prefix to so the name won't collide with other widgets
      elementTag: 'twx-widgetcoe',

      // Text displayed for the widget in the Palette
      // This will also be the name of the icon in ide/images directory
      label: 'Widget COE', 

      // category to assign the widget to, this value will be used by the
      // project definition to filter which widgets are valid for that type of project
      // Using ar places it in the 3D not the 2D widget collection
      category: 'ar',

      // list of groups this widget will be included in the widget palette
      // standard value are Containers, Input, and Other
      groups : ["COE Extension"],
      
      // avoids showing this widget in Studio; when duplicating this template, remove or change to true
      isVisibleInPalette: true,

      // List of properties that will be displayed in the widget properties panel once it's been dropped on the Canvas
      properties: [
        {
          name: 'incomingdata',
          label: 'Some Incoming data',
          datatype: 'json',
          default: {},
          isBindingTarget: true,
          isBindingSource: false,
          showInput: false
        },
        {
          name: 'outgoingdata',
          label: 'some return data',
          datatype: 'string',
          default: '',
          isBindingTarget: false,
          isBindingSource: true,
          showInput: false
        },  
        {
          name: 'actionid',
          label: 'Some action ID',
          datatype: 'string',
          default: 'NoAction',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true,
          editor: 'select',
          options: [
            {label: 'Information Dialog', value: "WorkInstructionDialog"},
            {label: 'Get Work Orders', value: "GetWorkOrder"},
            {label: 'Get Work Instructions', value: "GetWorkInstructions"},
            //{label: 'GetMetaList', value: "GetMetaList"},
            {label: 'No action', value: "NoAction"}
            ]
        },
        {
          name: 'autolaunch',
          label: 'Auto do start',
          datatype: 'boolean',
          default: false,
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'width',
          label: 'width',
          datatype: 'string',
          default: '40vw',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'height',
          label: 'height',
          datatype: 'string',
          default: '60vh',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'topoffset',
          label: 'top offset',
          datatype: 'string',
          default: '50px',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'leftoffset',
          label: 'left offset',
          datatype: 'string',
          default: '1px',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        }
      ],

       // List of services that will displayed in the widget properties panel
      services: [
        {
          name: 'start',
          label: 'Start'
        },
        {
          name: 'stop',
          label: 'Stop'
        }
      ],

      // List of events that will displayed in the widget properties panel
      events: [
        {
          name: 'clicked',
          label: 'Clicked'
        },
        {
          name: 'completed',
          label: 'Completed action'
        }
      ],

      // If you copy this extension to create your own extension as a starter be very careful with the naming structure
      // For example if you are creating a new widget called amazingar
      // Rename your files to suit
      // widgetcoe-ng.js will become amazingar-ng.js
      // widgetcoe.js will become amazingar.js
      // use the amazingar as a prefix to images helps remind you where they are being used

      dependencies: {
        files         : ['js/widgetcoe-ng.js','js/widgetcoe.js','images/widgetcoe_back.png', 'images/widgetcoe_next.png' ,'images/widgetcoe_expand.png'],
        angularModules: ['widgetcoe-ng']
      },

      // HTML to render when the widget is dropped on the Canvas
      designTemplate: function () {
        return '<div class="widgetcoeWidget"></div>';
      },

      //
      // Been very careful with the syntax in this section
      // I'm following the use model others have defined and this pattern works
      // use {{ for incoming properties }}
      // use double quotes for " outgoing properties "
      // and always have a delegate-field="delegate" defined
      //
      runtimeTemplate: function (props) {
        var tmpl = '<div ng-widgetcoe  incomingdata-field="me.incomingdata"  outgoingdata-field="me.outgoingdata" actionid-field={{me.actionid}} autolaunch-field={{me.autolaunch}}   width-field={{me.width}} height-field={{me.height}} topoffset-field={{me.topoffset}} leftoffset-field={{me.leftoffset}}  delegate-field="delegate"></div>' ; 
        return tmpl;
      }
    };
  }

  // registers the widget in Studio so that it gets displayed in the Widget Palette, it will only show up in the
  // Widget Palette for views that this widget is registered for (as determined by category property)
  twxAppBuilder.widget('twxWidgetcoe', twxWidgetcoe);

}());
