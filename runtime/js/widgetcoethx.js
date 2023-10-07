  // When making changes to either the design or ng files you will need to stop and start the Vuforia Studio service
  // Changes to your implemenation file in this case called widgetcoe.js you only need to start preview again



class Widgetcoethx {

    thxappkey;
    vuforiaScope;
    data;
    actionid;
    width;
    height;
    top;
    left;



    constructor( appKey , vuforiaScope, data,  actionid, width, height , top , left ,  renderer) {

        // Not using the topoffset, leftoffset yet
        this.thxappkey = appKey;
        this.vuforiaScope  = vuforiaScope;
        this.data = data;
        this.actionid = actionid;
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.renderer = renderer;
    }

    doAction = function () {
        // if (this.actionid == 'WorkInstructionDialog') {
        //     let wiDialogURL = this.createWorkInstructionDialogURL( this.data, "Information", this.width, this.height,"bottom", 'arial' , 20, 'arial' , 16);
        //     this.vuforiaScope.outgoingdataField = wiDialogURL;
        //     this.vuforiaScope.$parent.fireEvent('completed');
        //     this.vuforiaScope.$parent.$applyAsync();

        // } 

        if (this.actionid == 'GetDynamicModel') {
            this.getDynamicModel(this.thxappkey, this.vuforiaScope, this.data );
        }


        else  {
            // add more functions here with else if 
        
        }

    }

   
    getDynamicModel = function (thxappkey, vuforiaScope , partID) {

                    let http = vuforiaScope.data.http;
                    var URL = '/Thingworx/Things' + '/CAD_Repo/Services/UploadPVZfromDynamic';
                    var headers = {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                        appKey: thxappkey
                      };
                      
                      // Body
                      var params = {
                        "PartID": partID
                      };

                    http.post(URL, params, {
                      headers: headers,
                    })
                    .then(
                      function (data) {
                        if (data && data.data) {

                            // After pvz created now create the corresponding meta data file 
                            let pvzPath =  data.data.rows[0].pvzPath;
                            let pvzId =  data.data.rows[0].id;
                            console.log(" data.data.rows[0].result >>>" + pvzPath);
                            console.log(" data.data.rows[0].result >>>" + pvzId);
                            URL = '/Thingworx/Things' + '/CAD_Repo/Services/saveJsonMetaData';
                           
                            appKeyParams = {
                                "pvzId": pvzId
                              };

                              http.post(URL, appKeyParams, {
                                headers: headers,
                              })
                              .then(
                                function (data) {
                                  if (data && data.data) {
                                      console.log(" data.data >>>" + data.data);

                                      //return the PVZ path via outging field
                                        vuforiaScope.outgoingdataField = pvzPath;
                                        vuforiaScope.$parent.fireEvent('completed');
                                        vuforiaScope.$parent.$applyAsync();
                                  }
                                },
                                function (status) {
                                  console.log('Thingworx service saveJsonMetaData failed ', status);
                                }
                              )
                        }
                      },
                      function (status) {
                        console.log('Thingworx service UploadPVZfromDynamic failed ', status);
                      }
                    );
    }

}


