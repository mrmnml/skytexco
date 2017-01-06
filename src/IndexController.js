function IndexController($scope, $http, $location, $timeout, $q) {

    var vm = this;
    vm.src = 'asd';
    vm.timeout = $timeout;
    vm.selection = {
        packs: {},
        image: 0
    };
    vm.packs = [];
    vm.images = [];
    vm.slider = null;
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
    vm.loaded = loaded;

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

            // register watchers for
            $scope.$watchGroup(['vm.selection.packs.left', 'vm.selection.packs.right'], function () {
                console.log(vm.loaded());
            });
        });
    }

    function getAlbums() {
        // http request for album resource
        return $http.get($location['absUrl']() + 'api/albums').then(function (res) {
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
        vm.selection.image = n;
    }

    function isSelectedImage(n) {
        return vm.selection.image == n;
    }

    function loaded() {
        return !(vm.loading.right || vm.loading.left);
    }
}

app.directive("dynImg", function ($q) {
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
                    console.log(scope.dynSrc);
                    scope.loading = true;
                    var img = new Image();
                    img.onload = function () {
                        return $q(function (resolve, reject) {
                            if (element[0].children[0].src = img.src) {
                                scope.loading = false;
                                resolve(true);
                            }
                        }).then(function (res) {
                            $('.slider').slider({
                                showInstruction: false
                            });
                        });
                    };
                    img.src = scope.dynSrc;
                }
            );
        }
    };
});