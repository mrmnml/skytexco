var app = angular.module('app', ['revealer'])
    .controller('AppController', AppController);

function AppController($scope, $http, $location, $timeout, $q) {

    var vm = this;
    vm.src = 'asd';
    vm.timeout = $timeout;
    vm.selection = null;
    vm.packs = null;
    vm.images = [];
    vm.slider = null;
    vm.loaded = false;
    vm.loading = {
        left: false,
        right: false
    };
    vm.imageUrl = {
        left: null,
        right: null
    };
    vm.getThumb = getThumb;
    vm.selectImage = selectImage;
    vm.getImagePath = getImagePath;
    vm.isSelectedImage = isSelectedImage;
    activate();

    //

    function activate() {
        getAlbums().then(function () {
            // fill image array
            for (var i = 0; i < 39; i++) {
                vm.images.push(i);
            }
            // fill selection
            vm.selection = {
                packs: {
                    left: 'vanilla',
                    right: 'nsm'
                },
                image: 0
            };
            vm.loaded = true;

            // vm.$watch('selection.image',function(oldV,newV) {
            //     console.log(vm.selection.image);
            //     vm.imageUrl.left = getImagePath('left');
            //     vm.imageUrl.right= getImagePath('right');
            // });
        });
    }

    function getAlbums() {
        // http request for album resource
        return $http.get($location['absUrl']() + 'albums').then(function (res) {
            // copy result, return closure
            vm.packs = angular.copy(res.data);
            return true;
        })
    }

    function getThumb(n) {
        return '/images/thumbs/' + toTwoDigitNumber(n) + '.jpg';
    }

    function getImagePath(side) {
        return 'images/packs/' + vm.selection.packs[side] + '/' + toTwoDigitNumber(vm.selection.image) + '.jpg';
    }

    function toTwoDigitNumber(n) {
        var ret = (n + 1).toString();
        return ret.length == 1 ? '0' + ret : ret;
    }

    function selectImage(n) {
        // console.log('selected');
        vm.selection.image = n;
        vm.imageUrl.left = getImagePath('left');
    }

    function isSelectedImage(n) {
        return vm.selection.image == n;
    }
}
//
// link: function MySrcLink(scope, element, attrs) {
//     var img = null,
//         loadImage = function () {
//             element[0].src = "";
//
//             img = new Image();
//             img.src = scope.selection;
//
//             return img.onload = function () {
//                 element[0].src = img.src;
//             };
//         };
//
//
//     scope.$watch((function () {
//         return selection;
//     }), function (newVal, oldVal) {
//         if (oldVal !== newVal) {
//             console.log('ASD');
//             scope.loading = true;
//             element.class = 'loading';
//             loadImage();
//             // if (loadImage() == true) {
//             //     scope.loading = false;
//             // }
//         }
//

app.directive("dynImg", function () {
    return {
        scope: {
            loading: '=',
            dynSrc: '='
        },
        template: '<img src="{{ src }}" dyn-src="{{ dynSrc }}"  class="dyn" />',
        link: function MySrcLink(scope, element, attrs, ctrl) {
            // console.log(element);
            scope.$watch(function () {
                return scope.dynSrc;
            }, function () {
                console.log('change detected');
                var img = new Image();
                img.onload = function () {
                    scope.src = img.src;
                    console.log('image loaded');

                    console.log(scope);
                };
                img.src = scope.dynSrc;

            });
        }
    };
});