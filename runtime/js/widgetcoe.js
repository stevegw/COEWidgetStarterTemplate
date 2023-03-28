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

    constructor(vuforiaScope, data,  actionid, width, height , top , left) {

        // Not using the topoffset, leftoffset yet
        this.vuforiaScope  = vuforiaScope;
        this.data = data;
        this.actionid = actionid;
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
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
        else  {
            // add more functions here with else if 
        
        }

    }

    getWorkOrders = function () {
        let PanelQuery = 'body > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-content > twx-widget > twx-widget-content > \n' +
		'twx-container-content > twx-widget:nth-child(2) > twx-widget-content > div > twx-container-content';
        let PanelSelector = document.querySelector(PanelQuery); 
        this.UIContainer = document.createElement('div');
        this.UIContainer.id = 'ui-container-wo';
        this.UIContainer.className = 'uicontainer'; 
        this.UIContainer.style.width = this.width;
        this.UIContainer.style.height = this.height;
        this.UIContainer.style.top = this.top;
        this.UIContainer.style.left = this.left;

        var WorkOrderPanel = document.createElement('div');
        WorkOrderPanel.id = 'workorder-panel';   
        WorkOrderPanel.className = 'workorderpanel';  
        //WorkOrderPanel.style.width = this.width;
        //WorkOrderPanel.style.height = this.height; 


        var WorkOrderHeaderPanel = document.createElement('div');
        WorkOrderHeaderPanel.id = 'workorder-header-panel'; 
        WorkOrderHeaderPanel.className = 'workorderheaderpanel';    
        WorkOrderHeaderPanel.style.width = this.width;
        WorkOrderHeaderPanel.style.height = this.height; 
   
      
        var WorkOrderPicklist = document.createElement('div');
        WorkOrderPicklist.id = 'workorder-picklist-panel'; 
        WorkOrderPicklist.className = 'workorderpicklistpanel';   
        // WorkOrderPicklist.style.height = "32px";
        // WorkOrderPicklist.style.width = "200px";   
        WorkOrderPicklist.innerHTML = "Work Orders"; 
        WorkOrderPicklist.style.top = '0px';
        WorkOrderPicklist.style.left = '25px'; 


        //let selectArray = ["W0001", "W0002", "W0003", "W0004"];
        let selectArray = this.data;

        let WorkOrderList = document.createElement("select");
        WorkOrderList.id = "workorderslist";
        WorkOrderList.className = 'workorderpicklist';   
        WorkOrderPicklist.appendChild(WorkOrderList);

        let listscope = this.vuforiaScope;
        function listSelection (e) {
            //alert('value ' + this.value);
            listscope.outgoingdataField =  this.value;
            listscope.$parent.fireEvent('clicked');
            //const myTimeout = setTimeout( listscope.$parent.fireEvent('clicked'), 500);

        }
        
        //Create and append the options
        for (var i = 0; i < selectArray.length; i++) {
        var option = document.createElement("option");
        option.value = selectArray[i].WorkID;
        option.text = selectArray[i].Title;
        WorkOrderList.appendChild(option);

        }

        WorkOrderList.addEventListener("change",  listSelection );

        //Append the div to the higher level div  
        //WorkOrderPanel.appendChild(WorkOrderHeaderPanel);   
    
        //Append the div to the higher level div  
        WorkOrderHeaderPanel.appendChild(WorkOrderPicklist);
        
        var CloseButton = document.createElement('img');
        CloseButton.className ="closebutton";
        CloseButton.style.height = "40px";
        CloseButton.style.width = "40px";
        //CloseButton.style.position = "absolute";
        CloseButton.style.top = "0px";
        CloseButton.style.right = "0px";
        CloseButton.src = "extensions/images/widgetcoe_close.png";
        CloseButton.style.backgroundColor = "rgba(32,109,22,0.75)"
        CloseButton.addEventListener("click",  () => { 

            try { 
                //this.markupCanvas.vuforiaScope.$parent.fireEvent('markCancelled');
            } catch (ex) {

            }

            PanelSelector.removeChild(this.UIContainer);
    
        });

        WorkOrderHeaderPanel.appendChild(CloseButton);


    
        this.UIContainer.appendChild(WorkOrderHeaderPanel);
        PanelSelector.appendChild(this.UIContainer);


    }

    getWorkInstructionsSteps = function () {

        let PanelQuery = 'body > ion-side-menus > ion-side-menu-content > ion-nav-view > ion-view > ion-content > twx-widget > twx-widget-content > \n' +
		'twx-container-content > twx-widget:nth-child(2) > twx-widget-content > div > twx-container-content';
        let PanelSelector = document.querySelector(PanelQuery); 
  

        this.UIContainer = document.createElement('div');
        this.UIContainer.id = 'ui-container-wi';
        this.UIContainer.className = 'uicontainer'; 
        this.UIContainer.style.width = this.width;
        this.UIContainer.style.height = this.height;
        this.UIContainer.style.top = this.top;
        this.UIContainer.style.left = this.left;

        var InstructionPanel = document.createElement('div');
        InstructionPanel.id = 'instruction-panel';   
        InstructionPanel.className = 'instructionpanel';  
        InstructionPanel.style.width = this.width;
        InstructionPanel.style.height = this.height; 
      
        var InstructionContentPanel = document.createElement('div');
        InstructionContentPanel.id = 'instruction-content-panel';   
        InstructionContentPanel.className = 'instructioncontentpanel';  
        InstructionContentPanel.style.height = this.height;;

        var CloseButton = document.createElement('img');
        CloseButton.className ="closebutton";
        CloseButton.style.height = "40px";
        CloseButton.style.width = "40px";
        CloseButton.style.position = "absolute";
        CloseButton.style.top = "0px";
        CloseButton.style.right = "0px";
        CloseButton.src = "extensions/images/widgetcoe_close.png";
        CloseButton.style.backgroundColor = "rgba(32,109,22,0.75)";
        CloseButton.addEventListener("click",  () => { 

            try { 
                //this.markupCanvas.vuforiaScope.$parent.fireEvent('markCancelled');
            } catch (ex) {

            }

            PanelSelector.removeChild(this.UIContainer);
    
        });

        InstructionContentPanel.appendChild(CloseButton);


        var InstructionHeaderPanel = document.createElement('div');
        InstructionHeaderPanel.id = 'instruction-header-panel'; 
        InstructionHeaderPanel.className = 'instructionheaderpanel';    
 
      
        var InstructionStepPanel = document.createElement('div');
        InstructionStepPanel.id = 'instruction-step-panel'; 
        InstructionStepPanel.className = 'instructionsteppanel';   
        InstructionStepPanel.style.height = "32px";
        InstructionStepPanel.style.width = "109px";  
        
        let steps = this.data.length ;
        let currentStep = 1; 
        InstructionStepPanel.innerHTML = currentStep +" OF " + steps; 
        //InstructionStepPanel.style.top = '25px';
        //InstructionStepPanel.style.left = '25px'; 
    
      
        var InstructionHeaderActionPanel = document.createElement('div');
        InstructionHeaderActionPanel.id = 'instruction-header-action-panel';  
        InstructionHeaderActionPanel.className = 'instructionheaderactionpanel'; 
        InstructionHeaderActionPanel.style.top = '25px';
        InstructionHeaderActionPanel.style.left = '25px';   
      
        //Create the Button   
        // var InstructionResizeButton = document.createElement('button');
        // InstructionResizeButton.name = 'instruction-resize-button';   
        // InstructionResizeButton.type = 'button'; //Allowed values:  submit, button, reset  
        // InstructionResizeButton.diabled = 'false'; 
        // InstructionResizeButton.autofocus = 'false';  
        // InstructionResizeButton.innerHTML = ''; //The text to show on the button
        // InstructionResizeButton.title = 'Resize Work Instruction Panel'; //Add a tooltip to the button
        // InstructionResizeButton.className = 'instructionresizebutton'; 
        // InstructionResizeButton.style.top = '25px';
        // InstructionResizeButton.style.left = '25px'; 
    
       
        // //Append the button to the div  
        // InstructionHeaderActionPanel.appendChild(InstructionResizeButton);
    
     
        // var InstructionCollapseButton = document.createElement('button');
        // InstructionCollapseButton.name = 'instruction-collapse-button';   
        // InstructionCollapseButton.type = 'button'; //Allowed values:  submit, button, reset  
        // InstructionCollapseButton.diabled = 'false'; 
        // InstructionCollapseButton.autofocus = 'false';  
        // InstructionCollapseButton.innerHTML = ''; //The text to show on the button
        // InstructionCollapseButton.title = 'Collapse Work Instruction Panel'; //Add a tooltip to the button
        // InstructionCollapseButton.className = 'instructioncollapsebutton'; 
        // InstructionCollapseButton.style.top = '25px';
        // InstructionCollapseButton.style.left = '45px'; 

          
        // //Append the button to the div  
        // InstructionHeaderActionPanel.appendChild(InstructionCollapseButton);  
    

      
        var InstructionTextPanel = document.createElement('div');
        InstructionTextPanel.id = 'instruction-text-panel';  
        InstructionTextPanel.className = 'instructiontextpanel';

        var InstructionHeaderLabelPanel = document.createElement('div');
        InstructionHeaderLabelPanel.id = 'instruction-header-label-panel';  
        InstructionHeaderLabelPanel.innerHTML = this.data[currentStep-1].StepType;//"This is the header text"; 
        InstructionHeaderLabelPanel.className ='instructionheaderlabelpanel';
        InstructionHeaderLabelPanel.style.top = '65px';
        InstructionHeaderLabelPanel.style.left = '25px'; 
    
        var InstructionTextLabelPanel = document.createElement('div');
        InstructionTextLabelPanel.id = 'instruction-text-label-panel'; 
        InstructionTextLabelPanel.className = 'instructiontextlabelpanel'; 
        InstructionTextLabelPanel.innerHTML = this.data[currentStep-1].StepDetail;//"This is the work instruction text";   
        InstructionTextLabelPanel.style.top = '85px';
        InstructionTextLabelPanel.style.left = '25px'; 
    
        var InstructionActionPanel = document.createElement('div');
        InstructionActionPanel.id = 'instruction-action-panel'; 
        InstructionActionPanel.className = 'instructionactionpanel'; 
    	InstructionActionPanel.style.top = "140px";
	    InstructionActionPanel.style.left =  "25px";


        var BackButton = document.createElement('img');
        //NextButton.name = 'next-button';
        BackButton.src = "extensions/images/widgetcoe_back.png";   
        //NextButton.type = 'button'; //Allowed values:  submit, button, reset  
        //NextButton.diabled = 'false'; 
        //NextButton.autofocus = 'false';  
        //NextButton.innerHTML = ''; //The text to show on the button
        //NextButton.title = 'Next Button'; //Add a tooltip to the button
        BackButton.className = 'backbutton';   
        //BackButton.style.top = '25px';
        BackButton.style.left = '0px'; 
        
        //Append the button to the div  
        InstructionActionPanel.appendChild(BackButton); 
    
        var NextButton = document.createElement('img');
        //NextButton.name = 'next-button';
        NextButton.src = "extensions/images/widgetcoe_next.png";   
        //NextButton.type = 'button'; //Allowed values:  submit, button, reset  
        //NextButton.diabled = 'false'; 
        //NextButton.autofocus = 'false';  
        //NextButton.innerHTML = ''; //The text to show on the button
        //NextButton.title = 'Next Button'; //Add a tooltip to the button
        NextButton.className = 'nextbutton';   
        //NextButton.style.top = '25px';
        NextButton.style.right = '0px'; 
        
        //Append the button to the div  
        InstructionActionPanel.appendChild(NextButton);   
 

      
        //Append the div to the higher level div  
        
            //Append the div to the higher level div  
            InstructionPanel.appendChild(InstructionContentPanel);   
    
                //Append the div to the higher level div  
                InstructionContentPanel.appendChild(InstructionHeaderActionPanel);     
      
                    //Append the div to the higher level div  
                    //InstructionHeaderPanel.appendChild(InstructionStepPanel);   
    
                    //Append the div to the higher level div  
                    //InstructionHeaderPanel.appendChild(InstructionHeaderActionPanel);    
      
                //Append the div to the higher level div  
                InstructionContentPanel.appendChild(InstructionTextPanel);  
    
                    //Append the div to the higher level div  
                    InstructionTextPanel.appendChild(InstructionHeaderLabelPanel);  
      
                    //Append the div to the higher level div  
                    InstructionTextPanel.appendChild(InstructionTextLabelPanel);    
        
                    //Append the div to the higher level div  
                    InstructionTextPanel.appendChild(InstructionActionPanel);       
    
        //Append the div to the html  
        this.UIContainer.appendChild(InstructionPanel);
        PanelSelector.appendChild(this.UIContainer);


        
        
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

       return  textcanvas.toDataURL();

    }

}


