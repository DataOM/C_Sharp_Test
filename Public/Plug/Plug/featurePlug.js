$(document).ready(function(){
	


    $.fn.setActionFeature = function () {
       
        $("span[action]").not(".init").addClass("init").unbind().click(function () {
			
                let _dataTab = $(this).attr("data").split(',');
                let _params = '';
                for (let j = 0 ; j < _dataTab.length ; j++)
                    _params += _dataTab[j] + ((j < _dataTab.length - 1) ? ',' : '');
				let func = '$().' + $(this).attr("object") + '("' + $(this).attr("action") 
						  + '", ' + _params + ');';
				//alert(func);
				if($(this).attr("action") == "Remove"){			
				   let htmlDialog = '<div class="modal fade" id="dialogDeleteConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
					'	<div class="modal-dialog modal-sm">'+
					'		<div class="modal-content">		'+
					'			<div class="modal-header">'+
					'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
					'				<h4 class="modal-title" id="myModalLabel">Confirmation de suppression</h4>'+
					'			</div>'+
					'			<div class="modal-body">'+
					'				<p>Voulez vous vraiment supprimer ?</p>'+
					'			</div>'+							
					'			<div class="modal-footer">'+
					'				<button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>'+
					'				<a class="btn btn-danger btn-ok" id="btnDialogDeleteConfirm">Supprimer</a>'+
					'			</div>'+
					'		</div>'+
					'	</div>'+
					'</div>';
					$("#dialogDeleteConfirm").remove();
					$("body").append(htmlDialog);
					$('#dialogDeleteConfirm').modal('show');
					
					$('#dialogDeleteConfirm').on("click", "#btnDialogDeleteConfirm", function(event){
						//alert('ok');
						setTimeout(func, 1);
						$('#dialogDeleteConfirm').modal('hide');
					});
				}
				else
					setTimeout(func, 1);	
				
				return false;
			});
			//$('[data-toggle="tooltip"]').tooltip();
			
			let objSp = undefined;
        if (modeOrder == "outer") {
            objSp = $(winOrder.document.body);
        }
        else {
            objSp = $(document.body);
        }

        objSp.find("span[action]").not(".init").addClass("init").unbind().click(function () {
            let _dataTab = $(this).attr("data").split(',');
            let _params = '';
            for (let j = 0 ; j < _dataTab.length ; j++)
                _params += _dataTab[j] + ((j < _dataTab.length - 1) ? ',' : '');
            let func = '$().' + $(this).attr("object") + '("' + $(this).attr("action")
                      + '", ' + _params + ');';
            //alert(func);
            if ($(this).attr("action") == "Remove") {
                let htmlDialog = '<div class="modal fade" id="dialogDeleteConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                 '	<div class="modal-dialog modal-sm">' +
                 '		<div class="modal-content">		' +
                 '			<div class="modal-header">' +
                 '				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                 '				<h4 class="modal-title" id="myModalLabel">Confirmation de suppression</h4>' +
                 '			</div>' +
                 '			<div class="modal-body">' +
                 '				<p>Voulez vous vraiment supprimer ?</p>' +
                 '			</div>' +
                 '			<div class="modal-footer">' +
                 '				<button type="button" class="btn btn-default" data-dismiss="modal">Annuler</button>' +
                 '				<a class="btn btn-danger btn-ok" id="btnDialogDeleteConfirm">Supprimer</a>' +
                 '			</div>' +
                 '		</div>' +
                 '	</div>' +
                 '</div>';
                $("#dialogDeleteConfirm").remove();
                $("body").append(htmlDialog);
                $('#dialogDeleteConfirm').modal('show');

                $('#dialogDeleteConfirm').on("click", "#btnDialogDeleteConfirm", function (event) {
                    //alert('ok');
                    setTimeout(func, 1);
                    $('#dialogDeleteConfirm').modal('hide');
                });
            }
            else
                setTimeout(func, 1);
			
			return false;
        });
		
		
			$('span[pop], span[popMiss]').popover({
			    html: true,
			    placement: 'top',
			    trigger: 'manual',
			});

			$(".myTopScroll").scroll(function () {
			    $(this).next()
                    .scrollLeft($(this).scrollLeft());
			});
			$(".myTopScrollChild").scroll(function () {
			    $(this).prev()
                    .scrollLeft($(this).scrollLeft());
			});

			

            $('body').on('click', function (e) {
                $('[data-toggle=popover]').each(function () {
                    // hide any open popovers when the anywhere else in the body is clicked
                    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                        $(this).popover('hide');
                    }
                });
            });
		};

		$.fn.setDragFeature = function(){
			
		    $("#orderPanel div.PropOrder").not('.init').addClass('init').css("background", Config.orderPanelBackColor);
		    $("#orderPanel div.PropOrder").not('.init').addClass('init').draggable({
                opacity: .6,
                 cursorAt:{left:15},                 
				start: function() {
					$(this)
					.css("width", "100px")
                    .css("position", "absolute")
                    .css("height", "auto")
                    .css("z-index", "2000000");
				},
				drag: function() {
					$(this)
					.css("background", Config.orderPanelDragBackColor)
					.css("width", "100px");
				},
				stop: function() {
					$(this)
					//.attr("style", "")
					.css("width", "100%")
                    .css("position", "relative")
					.css("background", Config.orderPanelBackColor)
					//.css("padding", "7px 5px")
					//.css("left", position[0] + "px")
					//.css("top", position[1] + "px");
				},
				revert : function(event, ui) {
					// on older version of jQuery use "draggable"
					// $(this).data("draggable")
					// on 2.x versions of jQuery use "ui-draggable"
				    // $(this).data("ui-draggable

				    if ($(this).data("uiDraggable") != undefined) {

				        $(this).data("uiDraggable").originalPosition = {
				            top: 0,
				            left: 0
				        };
                        $(this).css("position", "relative");
                        $(this).css("height", "40px");
				    }
					// return boolean
					return !event;
					// that evaluate like this:
					// return event !== false ? false : true;
				}	
                  });
                
            
		    $("tr[tranche] td.info div[cdata]").not('.init').addClass('init').draggable({
                opacity: .6,
                 cursorAt:{left:15},                 
				start: function() {
					$(this)
					.css("width", "100px")
                    .css("height", "auto")
                    .css("z-index", "2000000");
				},
				drag: function() {
					$(this)
					.css("background", Config.orderPanelDragBackColor)
					.css("width", "100px");
				},
				stop: function() {
					$(this)
					.attr("style", "");

                    //.css("position", "relative")
					//.css("background", "")
					//.css("padding", "7px 5px")
					//.css("left", position[0] + "px")
					//.css("top", position[1] + "px");
				},
				revert : function(event, ui) {
					// on older version of jQuery use "draggable"
					// $(this).data("draggable")
					// on 2.x versions of jQuery use "ui-draggable"
				    // $(this).data("ui-draggable

				    if ($(this).data("uiDraggable") != undefined) {

				        $(this).data("uiDraggable").originalPosition = {
				            top: 0,
				            left: 0
				        };
                        $(this).css("position", "relative");
				    }
					// return boolean
					return !event;
					// that evaluate like this:
					// return event !== false ? false : true;
				}					
			});
			
			
			$("table[planTable] tr[tranche] td.success").not('.init').addClass('init').droppable({
				over: function(event, ui){					
					$(this).css("background", Config.orderPanelDragBackColor);
				},
				out: function(event, ui){
					//$(this).css("background", 'green');
				    $(this).attr("style", "");
				    
				    $("td[color]").each(function () {
				        $(this).css("background", $(this).attr("color"));
				    });
				},
				drop: function(event, ui){
					let index = $(this).closest("tr").find("td").index($(this));
					let id = $(this).closest("table[plantable]").find("tr[Plan] td:eq(" + index + ")").attr("id");
					let options = $().Plan('get', id);
					if (ui.draggable.attr("data") != undefined) {
					    let str = ui.draggable.attr("data");
					    // alert(str);

					    let settings = jQuery.parseJSON(str);

					    let from = $(this).closest("tr").attr("tranche");
					    let to = getToDate(options.date, from, options.step, settings.Period);

					    //alert(from + "\n" + to);
					    from = moment(from, "DD/MM/YYYY hh:mm").toDate();
					    to = moment(to, "DD/MM/YYYY hh:mm").toDate();

					    settings['plan'] = {
					        id: id, date: options.date, from: from,
					        to: to, step: options.step
					    };

					    $(this).attr("style", "");
					    $().Action("insertOTToPlan", settings, ui);
					}

                    if (ui.draggable.attr("cdata") != undefined) {
					    let str = ui.draggable.attr("cdata");
					    // alert(str);

					    let settings = jQuery.parseJSON(str);

					    let from = $(this).closest("tr").attr("tranche");
					    let to = getToDate(options.date, from, options.step, settings.Period);

					    //alert(from + "\n" + to);
					    from = moment(from, "DD/MM/YYYY hh:mm").toDate();
					    to = moment(to, "DD/MM/YYYY hh:mm").toDate();

					    settings['plan'] = {
					        id: id, date: options.date, from: from,
					        to: to, step: options.step, oldPlanId : settings.planId, oldFromDate : settings.fromDate
					    };

					    $(this).attr("style", "");
					    $().Action("RemoveinsertOTToPlan", settings, ui);
					}
					
					//alert(ui.draggable.attr("data"));
					//$(this).css("background", 'blue');
				}
			});

			$("td.info").unbind();

			
            
            $("td.success").unbind().click(function () {

                

                selectedElem = $(this);
                
                $("td.success").css("background", "");
                $(selectedElem).css("background", "#F7E779");


               
            });

            
		};


   $.fn.setOrderOptions = function () {
		let welem = undefined;
        
        if(modeOrder == "outer")
            welem = $(winOrder.document.body);
        else
            welem = $(document.body);

        welem.find("#btnsetModeOrder1").click(function () {
            
            modeOrder = "inner";
           
            $("#dvFlotPanel").css("display", "");

			/*
            let tags = welem.find('#orderTxtSearch').tagsinput('items');		
			if(modeOrder == "outer"){
				welem.find('#orderTxtSearch').tagsinput('removeAll');	
				$(winOrder.document.body).find("#orderTxtSearch").val(tags);				
			}
			else{
				welem.find('#orderTxtSearch').tagsinput('removeAll');	
				$(document.body).find("#orderTxtSearch").val(tags);
			}

            tags = welem.find('#orderTxtSort').tagsinput('items');
            $("#orderTxtSort").val(tags);
			*/
			let _tag = $().PropOrder("getFilter");
			$(document.body).find("#orderTxtSearch").val(_tag);

            $.fn.setActionFeature();
            $.fn.setDragFeature();
            //$.fn.setOrderOptions();

            $().PropOrder("refresh");

            winOrder.close();

            return false;
        });
		
		
        var elt = /*$*/ welem.find('#orderTxtSearch');
		    elt.tagsinput();

        /*$*/ welem.find('#orderTxtSearch').on('itemAdded', function (event) {
		        let tags = $(this).tagsinput('items');
		        $().PropOrder('Filter', tags);
		    });

        /*$*/ welem.find('#orderTxtSearch').on('itemRemoved', function (event) {
		        let tags = $(this).tagsinput('items');
		        $().PropOrder('Filter', tags);
		    });

		    var SortColumns = [
				{ label: "zoom", value: "1" },
				{ label: "Period", value: "5" }
		    ];

		    var SortColumnsBlood = new Bloodhound({
		        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
		        queryTokenizer: Bloodhound.tokenizers.whitespace,
		        local: SortColumns
		    });
		    SortColumnsBlood.initialize();

		    elt = /*$*/ welem.find('#orderTxtSort');
		    elt.tagsinput({
		        itemValue: 'value',
		        itemText: 'label',
		        typeaheadjs: {
		            name: 'SortColumnsBlood',
		            displayKey: 'label',
		            source: SortColumnsBlood.ttAdapter()
		        }
		    });


		    if (modeOrder == "outer") {
		        welem.find('#orderTxtSort').tagsinput('removeAll');						

		        let tags = welem.find('#orderTxtSort').tagsinput('items');
		        for (let i = 0; i < tags.length ; i++) {
		            elt.tagsinput('add', { "value": tags[i].value, "label": tags[i].label });
		        }
		   }

        
		    if (modeOrder == "inner" && winOrder != undefined) {
		        $('#orderTxtSort').tagsinput('removeAll');

		        let tags = $(winOrder.document.body).find('#orderTxtSort').tagsinput('items');
		        for (let i = 0; i < tags.length ; i++) {
		            elt.tagsinput('add', { "value": tags[i].value, "label": tags[i].label });
		        }
		    }
            

        /*$*/ welem.find('#orderTxtSort').on('itemAdded', function (event) {
		        let tags = $(this).tagsinput('items');
		        let op = $(this).closest("div.input-group").find('button span[val]').attr("val");

		        $().PropOrder('Sort', tags, op);
		    });

        /*$*/ welem.find('#orderTxtSort').on('itemRemoved', function (event) {
		        let tags = $(this).tagsinput('items');
		        let op = $(this).closest("div.input-group").find('button span[val]').attr("val");

		        $().PropOrder('Sort', tags, op);
		    });

        /*$*/ welem.find('#dvOrderSort button').click(function () {
		        $('#display_advance').toggle('1000');
		        let elem = $(this).find('span[val]');
		        if (elem.attr("val") == "+")
		            elem.attr("val", "-");
		        else
		            elem.attr("val", "+");

		        $(this).find("span").toggleClass("glyphicon-sort-by-order glyphicon-sort-by-order-alt");

		        let op = elem.attr("val");
		        let tags = /*$*/ welem.find('#orderTxtSort').tagsinput('items');
		        $().PropOrder('Sort', tags, op);
		    });
		
	};
	

    $.fn.setError = function(title, msg, time){
        $('html, body').animate({ scrollTop: 50 }, 'slow');
        $("#dvErrors strong").html(title);
        $("#dvErrors span").html(msg);
        $("#dvErrors").fadeIn().delay(time * 1000).fadeOut();// function(){
         
    };

    $("#dvErrors").fadeOut('fast');


});