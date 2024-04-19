  // When making changes to either the design or ng files you will need to stop and start the Vuforia Studio service
  // Changes to your implemenation file in this case called widgetcoe.js you only need to start preview again



class Widgetcoe {

    vuforiaScope;
    data;
    actionid;
    width;
    height;
    top;
    left;
    modelid;
    GETDYNAMICMODEL_INIT_STATE = false;

    constructor(vuforiaScope, data,  actionid, width, height , top , left , modelid , renderer) {

        // Not using the topoffset, leftoffset yet
        this.vuforiaScope  = vuforiaScope;
        this.data = data;
        this.actionid = actionid;
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.modelid = modelid;
        this.renderer = renderer;
    }

    doAction = function () {
        if (this.actionid == 'WorkInstructionDialog') {
            let wiDialogURL = this.createWorkInstructionDialogURL( this.data, "Information", this.width, this.height,"bottom", 'arial' , 20, 'arial' , 16);
            this.vuforiaScope.outgoingdataField = wiDialogURL;
            this.vuforiaScope.$parent.fireEvent('completed');
            this.vuforiaScope.$parent.$applyAsync();

        } else if (this.actionid == 'GetWorkOrder') {
            this.getWorkOrders (this.data);
        }
        else if (this.actionid == 'GetWorkInstructions') {
            this.getWorkInstructionsSteps (this.data);
        }
        else if (this.actionid == 'GetMetaList') {
            this.getMetaList (this.data);
        }

        // DisplayList
        else if (this.actionid == 'DisplayList') {
            this.displayList (this.data);
        } 

        else if (this.actionid == 'MoveModel') {
            this.moveModel (this.vuforiaScope );
        }
         

        else if (this.actionid == 'GetDynamicModel') {
            this.getDynamicModel(this.vuforiaScope, this.data );
        }

        else if (this.actionid === 'RegisterWidgets') {

            try {


                //var modelsJSON = new Array();
                //modelsJSON.push( {'model' : "sphere-1" , 'src': "sphere.pvz" , 'x': "0", 'y': "0", 'z': "0" });
                //modelsJSON.push( {'model' : "sphere-2" , 'src': "sphere.pvz" , 'x': "0.1", 'y': "0", 'z': "0" });
                //modelsJSON.push( {'model' : "sphere-3" , 'src': "sphere.pvz" , 'x': "0.2", 'y': "0", 'z': "0" });

                for (let index = 0; index < this.vuforiaScope.data.widgets.length; index++) {
                    const element = this.vuforiaScope.data.widgets[index];
                    this.vuforiaScope.data.widgetRegister.addWidget({
                        originalWidget: "twx-dt-model",
                        id: element.model,
                        src: "app/resources/Uploaded/"+element.src ,  //"app/resources/Uploaded/remote-control.pvz",
                        x: element.x,
                        y: element.y,
                        z: element.z,
                        rx: "0",
                        ry: "0",
                        rz: "0",
                        scale: "1",
                        visible : true,
                        events:[{name:"modelLoaded", value: "someExample()"}]
                    })
                    console.log("Model" + element.src);

                }

                
            } catch (error) {
                console.log("Issues with widgetRegister error=" + error);
            }
        }


        else  {
            // add more functions here with else if 
        
        }

    }


    getMetaList = function (data) {
  
        try {

            let jsondata = JSON.parse(data);
            console.log("GetMetaList >>>>" + JSON.stringify(jsondata));

            let targetName = jsondata[0].model;
            let propertyName = jsondata[0].property;
            // targetName = model id
            // propertyName = 'REF_DES' for example

            PTC.Metadata.fromId(targetName).then( (metadata) => {
                let foundItems = [] ;

                var whereFunc = function(pathid) {
                const propvalue = metadata.get(pathid, propertyName)
                return propvalue != undefined && propvalue != "";
                }
                let result = metadata.findCustom(whereFunc);

                // Work through result that should contain all REF_DES items based on the findcustom whereFunc
                result._selectedPaths.forEach(function (occurence) {
                //
                // [{"model":"myModel","path":"/2788/2359/927/53/66/580"}]
                // 
                foundItems.push({"model":targetName,"path":occurence});

                });

                this.vuforiaScope.outgoingdataField = foundItems;
                this.vuforiaScope.$parent.fireEvent('completed');
                this.vuforiaScope.$parent.$applyAsync();

            });

            

        } catch (err) {

            console.log(err);
        }

    }
    
    displayList = function (data) {


        let PanelQuery = 'body > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-content > twx-widget > twx-widget-content > \n' +
		'twx-container-content > twx-widget:nth-child(2) > twx-widget-content > div > twx-container-content';
        let PanelSelector = document.querySelector(PanelQuery); 
  

        let UIContainerWI = document.createElement('div');
        UIContainerWI.id = 'ui-container-dlist';
        UIContainerWI.className = 'uicontainer'; 
        UIContainerWI.style.width =  this.width;
        UIContainerWI.style.height = this.height;
        UIContainerWI.style.top = this.top;
        UIContainerWI.style.left = this.left;
        UIContainerWI.style.overflow = 'auto';
        UIContainerWI.style.backgroundColor = 'rgba(250,250,250,0.3)';
        


        // // Create a div element to hold the grid
        // var grid = document.createElement("div");
        // // Set the id and class attributes of the grid
        // grid.id = "grid";
        // grid.className = "grid-container";
        // // Append the grid to the body of the document
        // //UIContainerWI.appendChild(grid); 

        // // Define the number of rows and columns for the grid
        // var rows = data.length;
        // var columns = data[0].inputs.length;

        // grid.style.gridTemplateColumns= 'repeat('+columns+', 1fr)';
        // grid.style.gridRow = 'repeat('+data.length+', 1fr)';
        // //grid.style.container.overflowX = 'auto';

        
        // Loop through the Data
        for (var i = 0; i < data.length; i++) {

            var rowItem = document.createElement("div");
            rowItem.id = "rowItem"+ i;
            rowItem.style.padding = "2px";

            var inputContainer = document.createElement("div");
            inputContainer.id = "inputContainer"+i;
            inputContainer.style.display = 'flex';  //; flex-direction: row;
            inputContainer.style.flexDirection ='row';

            //Loop inputs

            for (var j = 0; j < data[i].inputs.length; j++) {

                var itemLabel = document.createElement("div");
                itemLabel.id = data[i].inputs[j].id;
                itemLabel.innerHTML = data[i].inputs[j].id + "&nbsp;&nbsp;" + data[i].inputs[j].displayName;
                itemLabel.style.padding = "2px";

                var inputValue = document.createElement("input");
                inputValue.id = "input"+ data[i].inputs[j].id;

                if (data[i].inputs[j].inputType === 'DATETIME') {
                    inputValue.type = 'date';
                    inputValue.addEventListener("click", (event) => {
                        const input = event.target;
                        try {
                          input.showPicker();
                        } catch (error) {
                          window.alert(error);
                        }
                      });


                } else if ( data[i].inputs[j].inputType === 'NUMBER') {
                    inputValue.type = 'number';
                    inputValue.min = 10;
                    inputValue.max = 40;

                }

                //::-webkit-calendar-picker-indicator
                 
                inputValue.style.padding = "2px";
                inputValue.style.borderRadius = '5px';
        

                inputContainer.append(itemLabel);
                inputContainer.append(inputValue);

               

            }
            rowItem.append(inputContainer);
            UIContainerWI.append(rowItem);
        }
        
        // Append the style to the head of the document
        PanelSelector.appendChild(UIContainerWI);

    }


    moveModel = function (vuforiaScope) { 


        // let's start by extracting the values into some helper objects
        var headpos  = new Vector4().Set3a(vuforiaScope.data.args.position);	//Position as a vector
        var headgaze = new Vector4().Set3a(vuforiaScope.data.args.gaze);  
        var headup   = new Vector4().Set3a(vuforiaScope.data.args.up); 

        // the most efficient way to position anything is to work in matrix space, so let start by building a matrix which describes
        // the location we are looking for

        // first we need to work out where to position our pointer - lets hang it approx 40cm in front of the user head
        // to do this we take the headgaze vector (which is normalised, therefore length = 1) and we scale it by 0.4 (0.4*1m = 40cm)
        // we then add this vector to the head position (headpos). The result is a 'position' that is 40cm in front of the head, whatever
        // direction the user is looking
        var lookpos = headpos.Add(headgaze.Scale(0.4));

        // in an alternative example, you can fix the arrow at the origin and have it always point at the user
        //var lookpos = new Vector4();
        //$scope.lookat = headpos;

        // now lets create a matrix that will point the arrow ALONG the gaze vector
        // we have a helper function to do that
        // makepose tests the location of the item, the direction to point, and the up vector.
        var lm    = new Matrix4().makePose(lookpos,headgaze,headup);
        
        // an alternative, put the item at the fixed point in front, and make it point to another fixed point
        // again, there's a helper function to do this (makelookat) which takes two positions, the first is the point to look
        // at the second the point to look from.
        //var lm    = new Matrix4().makeLookat($scope.lookat,lookpos,headup);
        
        // Studio/view expects to relocate items using Euler angles (not matrices) so we need to extract the 'pose' from
        // out matrix. Again, we have a handy function ToPosEuler which will return an object with two Vectors - the position
        // and the cyz (pitch,yaw,roll) angles 
        var es    = lm.ToPosEuler(true);  
          
        
        // position either the 3d arrow or the 2d image based on what we calculated
        if (this.modelid != "") {

            // mName + '-' + idpath

            this.renderer.setTranslation(this.modelid +'-' + vuforiaScope.data.occurance, es.pos.X(), es.pos.Y(), es.pos.Z());
            this.renderer.setRotation   (this.modelid +'-' + vuforiaScope.data.occurance, es.rot.X(), es.rot.Y(), es.rot.Z());
        }
          
          // and lets use the gaze to work out where we are looking on the floor
          // because its a unit vector, we can use this to our advantage; if we are H above the floor, we can scale the
          // gaze vector by H and, if we add it to the position, we will end up with Y=0 and x,z being the location on the floor
          // of course this only works if the user is looking DOWN, so we test first the sign of the gaze Y value...
        if (headgaze.Y() < 0) {
            
            // how many gazevectors are we off the floor?
            var yscale = Math.abs(headpos.Y()/headgaze.Y());
            // scale by that value, and add to headpos - result should be y=0 i.e. ON the floor
            var fp = headpos.Add(headgaze.Scale(yscale));
            
            // we now use the gaze vector to work out which direction to have it face the camera correctly all the time
            var gz = new Vector4().SetV4(headgaze);
                gz.v[1]=0;      // we neutralise the Y component, leaving xz
                gz.Normalize(); // which we must then normalize
            
            var up = new Vector4().Set3(0,1,0);
            var gx = gz.CrossP(up);	// work out the third component (x)
            
            // now build the rotation matrix
            var gm = new Matrix4().Set3V(gx,up,gz);
            // images by defualt are upright, so we need to rotate by =90 in x FIRST and then rotate to align
            var gn = new Matrix4().Rotate([1,0,0],-Math.PI/2)
                                  .Multiply(gm.m)
                                  .TranslateV4(fp);
            var em = gn.ToPosEuler(true);

            // set the new position of the item - it should always be on the floor (y==0)
            this.renderer.setTranslation("target", em.pos.X(), em.pos.Y(), em.pos.Z());
            this.renderer.setRotation   ("target", em.rot.X(), em.rot.Y(), em.rot.Z());

        }
  






    }

    createWorkInstructionDialogURL = function ( WorkInstructionText, HeaderText, DialogWidth, DialogHeight, LeaderLine, HeaderFont, HeaderFontSize, BodyFont, BodyFontSize) {

        var textcanvas = document.createElement('canvas');
        var ctxtext = textcanvas.getContext("2d");

        if ((LeaderLine.toUpperCase() == 'NONE') || (LeaderLine.toUpperCase() == 'BOTTOM')) {

            if (LeaderLine.toUpperCase() == 'NONE') {

                textcanvas.width = DialogWidth;
                textcanvas.height = DialogHeight;

            } else if (LeaderLine.toUpperCase() == 'BOTTOM') {

                textcanvas.width = DialogWidth;
                textcanvas.height = DialogHeight * 2;

            }

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(0, 0, DialogWidth, DialogHeight);
            ctxtext.fillRect(0, 0, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(0, 0, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(0, 0, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 10, ((DialogHeight * 0.25) / 2), (DialogWidth - 20), 18);

            //WorkInstruction Text
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 10, ((DialogHeight * 0.25) + 20), (DialogWidth - 20), 18);

            if (LeaderLine.toUpperCase() == 'BOTTOM') {

                //Create Bottom Leaderline
                ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
                ctxtext.beginPath();
                ctxtext.moveTo((DialogWidth / 2), DialogHeight);
                ctxtext.lineTo((DialogWidth / 2), (DialogHeight + 75));
                ctxtext.stroke();

                ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
                ctxtext.clearRect((DialogWidth / 2) - 10, (DialogHeight + 75), 20, 20);
                ctxtext.fillRect((DialogWidth / 2) - 10, (DialogHeight + 75), 20, 20);

            }

        } else if (LeaderLine.toUpperCase() == 'LEFT') {

            textcanvas.width = DialogWidth * 2;
            textcanvas.height = DialogHeight;

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(95, 0, DialogWidth, DialogHeight);
            ctxtext.fillRect(95, 0, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(95, 0, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(95, 0, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 105, ((DialogHeight * 0.25) / 2), (DialogWidth - 20), 18);

            //WorkInstruction Text  
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 105, ((DialogHeight * 0.25) + 20), (DialogWidth - 20), 18);

            //Create Left Leaderline
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.beginPath();
            ctxtext.moveTo(0, (DialogHeight / 2));
            ctxtext.lineTo(95, (DialogHeight / 2));
            ctxtext.stroke();

            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.clearRect(0, ((DialogHeight / 2) - 10), 20, 20);
            ctxtext.fillRect(0, ((DialogHeight / 2) - 10), 20, 20);

        } else if (LeaderLine.toUpperCase() == 'RIGHT') {

            textcanvas.width = DialogWidth * 2;
            textcanvas.height = DialogHeight;

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(0, 0, DialogWidth, DialogHeight);
            ctxtext.fillRect(0, 0, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(0, 0, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(0, 0, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 10, ((DialogHeight * 0.25) / 2), (DialogWidth - 20), 18);

            //WorkInstruction Text  
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 10, ((DialogHeight * 0.25) + 20), (DialogWidth - 20), 18);

            //Create Right Leaderline
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.beginPath();
            ctxtext.moveTo(DialogWidth, (DialogHeight / 2));
            ctxtext.lineTo((DialogWidth + 95), (DialogHeight / 2));
            ctxtext.stroke();

            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.clearRect(((DialogWidth + 95) - 20), ((DialogHeight / 2) - 10), 20, 20);
            ctxtext.fillRect(((DialogWidth + 95) - 20), ((DialogHeight / 2) - 10), 20, 20);

        } else if (LeaderLine.toUpperCase() == 'TOP') {

            textcanvas.width = DialogWidth;
            textcanvas.height = DialogHeight * 2;

            //Create Background 
            ctxtext.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctxtext.clearRect(0, 95, DialogWidth, DialogHeight);
            ctxtext.fillRect(0, 95, DialogWidth, DialogHeight);

            //Create Header Bar  
            ctxtext.fillStyle = 'rgba(70, 161, 218, 1)';
            ctxtext.clearRect(0, 95, DialogWidth, (DialogHeight * 0.25));
            ctxtext.fillRect(0, 95, DialogWidth, (DialogHeight * 0.25));

            //Header Text
            ctxtext.font = HeaderFontSize + 'px' + ' ' + HeaderFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctxtext.textBaseline = 'middle';
            wrapText(ctxtext, HeaderText, 10, (95 + ((DialogHeight * 0.25) / 2)), (DialogWidth - 20), 18);

            //WorkInstruction Text
            ctxtext.font = BodyFontSize + 'px' + ' ' + BodyFont;
            ctxtext.fillStyle = 'rgba(255, 255, 255, 1.0)';
            //ctxtext.textAlign = 'center';
            wrapText(ctxtext, WorkInstructionText, 10, (95 + ((DialogHeight * 0.25) + 20)), (DialogWidth - 20), 18);

            //Create Bottom Leaderline
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.beginPath();
            ctxtext.moveTo((DialogWidth / 2), 20);
            ctxtext.lineTo((DialogWidth / 2), 95);
            ctxtext.stroke();
            ctxtext.fillStyle = 'rgba(0, 0, 0, 1.0)';
            ctxtext.clearRect((DialogWidth / 2) - 10, 0, 20, 20);
            ctxtext.fillRect((DialogWidth / 2) - 10, 0, 20, 20);

        }

        function wrapText(context, text, x, y, maxWidth, lineHeight) {


            try {
                if (text != null || text !== " " || text !== "") {

                    var words = text.split(' '),
                        line = '',
                        lineCount = 0,
                        i,
                        test,
                        metrics;
                    for (i = 0; i < words.length; i++) {
                        test = words[i];
                        metrics = context.measureText(test);
                        while (metrics.width > maxWidth) {
                            // Determine how much of the word will fit
                            test = test.substring(0, test.length - 1);
                            metrics = context.measureText(test);
                        }
                        if (words[i] != test) {
                            words.splice(i + 1, 0, words[i].substr(test.length))
                            words[i] = test;
                        }
                        test = line + words[i] + ' ';
                        metrics = context.measureText(test);
                        if (metrics.width > maxWidth && i > 0) {
                            context.fillText(line, x, y);
                            line = words[i] + ' ';
                            y += lineHeight;
                            lineCount++;
                        } else {
                            line = test;
                        }
                    }
                    ctxtext.fillText(line, x, y);
                }
    
                return textcanvas.toDataURL();
                
            } catch (error) {
                
            }
            


        }


    }

   
    getDynamicModel = function (vuforiaScope , partID) {

                    let http = vuforiaScope.data.http;

                    var URL = '/Thingworx/Things' + '/CAD_Repo/Services/UploadPVZfromDynamic';
                    var headers = {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                        appKey: '945a7d18-66eb-44ee-b14a-05fd3789cb00'
                      };
                      
                    //   var appKeyParams = {
                    //     "PartID": "VR:wt.part.WTPart:6200013"
                    //   };
                      var appKeyParams = {
                        "PartID": partID
                      };

                    http.post(URL, appKeyParams, {
                      headers: headers,
                    })
                    .then(
                      function (data) {
                        if (data && data.data) {
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

                                        vuforiaScope.outgoingdataField = pvzPath;
                                        vuforiaScope.$parent.fireEvent('completed');
                                        vuforiaScope.$parent.$applyAsync();
                                  }
                                },
                                function (status) {
                                  console.log('Could not get Application key for subscriptions', status);
                                }
                              )
                        }
                      },
                      function (status) {
                        console.log('Could not get Application key for subscriptions', status);
                      }
                    );

    }

}


