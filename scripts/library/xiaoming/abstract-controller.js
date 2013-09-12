define(function(require, exports, module){
	var ViewManager = require('xiaoming/view-manager');
	
	
	
	var AbstractController = function(options){
		this._initAbstractController(options);
	};
	
	AbstractController.prototype = {
		_initAbstractController: function(options){
			this.options = {};
			
			for(var key in options){
				this.options[key] = options;
			}
			
			
			this._view = null;
			this._request = null;
			this._controllerName = null;
			this._controllerManager = null;
			this._eventManager = null;
			this._router = null;
			
		},
		//视图管理器
		_viewManager : new ViewManager(),
		/**
		 * Abstract method 
		 */
		initEvents: function(){
			
		},
		//执行controller
		run: function(){
			var self = this;
			this.initEvents();
			this._viewManager.getView(this.get('controllerName'), function(viewRef){
				var v = new viewRef();
				v.setRequest(self.get('request'));
				v.setEventManager(self.get('eventManager'));
				self.set('view', v);
				self.get('view').render();
			});
			
		},
		/**
		 * 前进
		 * @param intent {controllerName, request, controllerManager, eventManager}
		 */
		forward: function(intent){
			this.get('router').dispatch(intent);
		},
		
		distroy: function(){
			this._view.distroy();
		},
		
		get: function(key){
			if(this['_' + key]){
				return this['_' + key];
			}else{
				return null;
			}
			
		},
		
		set: function(key, value){
			this['_' + key] = value;
		}
		
	};

	module.exports = AbstractController;
});