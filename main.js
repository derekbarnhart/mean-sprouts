angular.module('mean-notifications',[])
.directive('mnNotePanel',function(){
    return {
        restrict: 'E',
        template: "<div ui-scrollfix><alert  style=\"margin-left:20%; margin-right:20%;\" ng-repeat=\"alert in openNotifications\" type=\"alert.type\" close=\"closeAlert(this.alert)\">{{alert.msg}}</alert></div>",
        controller: function($scope, $rootScope, $http, mnNotifications) {

            //get a listing of notifications
            $scope.openNotifications = mnNotifications.get();


           /*
            //subscribe to any real time notifications from the server
            $scope.subscription = FayClient.subscribe('/notifications', function(data) {
                mnNotifications.notify(data)
            });
            */

            //function to kill alerts
            $scope.closeAlert = function(item){
                console.dir(arguments)
                mnNotifications.close(item.id)
            }
        }
    }
})
.factory('mnNotifications',function(){
        var notificationList = [];

        return {

            /**
             * Call this to create a global notification
             * Usage:
             *
             *
             *
             * Notifications.notify(
             * {
				id:"successSave",
				type: 'success',
				msg: 'This is the message for the user!'
			    });

             TODO add:
             - Persistence
             - Actions that notification can perform

             * @param notificationConfig
             * @returns {*}
             */
            notify:function(notificationConfig)
            {
                //check for an id
                if(!notificationConfig.hasOwnProperty('id')){

                    notificationConfig['id'] = _.uniqueId('n_');
                }else{

                    if( typeof _.find(notificationList, function(notification){ return notification.id == notificationConfig.id }) != 'undefined'){
                        console.log('Duplicate notification detected')
                        return notificationConfig['id']
                    }
                }

                notificationList.push(notificationConfig)

                return notificationConfig.id
            },

            /**
             *
             * @param id
             * @returns {Array}
             */
            get:function(id){ // Returns the entire list of notifications
                return notificationList;
            },


            /**
             * Closes a notification
             * @param id
             */
            close:function(id)
            {
                var search = _.find(notificationList, function(notification){ return notification.id == id })
                var index = _.indexOf(notificationList, search);
                notificationList.splice(index,1)
                console.log('Removed notification: '+id)
            }
        }
})


